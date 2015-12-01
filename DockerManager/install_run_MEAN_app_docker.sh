#!/bin/bash
# Script to Running a MEAN web application in Docker containers on AWS EC2 Ubuntu

# Assumptions
# Docker is installed on your machine and is added to your user group on your EC2 Instance
# if it is not installed 
# Run : sudo apt-get install docker
# Add the user to the Docker group so you can execute Docker commands without using sudo
# to do this run following command
# sudo usermod -a -G docker your_machine_name(e.g ubuntu@ip_address here ubuntu is your machine name)
# logout and check if docker is added to user group or not by running
# docker info (if this command runs fine you added socker to user group successfully)

# In this we're running our MongoDB and Web Application in different containers
# The last argument mongo is the name of the image from which it should create the container. 
# Docker will first search for this image locally. 
# When it doesn’t find it, it will go ahead and download it and all the base images that it is dependent on.
# -d flag ensures that it is run in detached mode (in the background) so that we can use this same shell to run our other commands

docker run --name mymongodb -d mongo

# To check everything is working fine
# run : docker ps -a
# you'll see your mongo instance running

# The next part is to run our web application as a separate container
# we're using https://hub.docker.com/r/maccam912/meanjs/ hat already has meanjs and all dependencies already installed on it

# Explanation about this command is as below

# here "-link mymongodb:db_1" adds a link between this container and our mymongodb container. 
# Our web application is able to connect to the database running on the mymongodb container. 
# db_1 is the alias name that is to reference the connected container. 
# Our MEAN application is using db_1, so using it name.

# "-p 80:3000", where we map 3000 port on the container to port 80 on the host machine.
# Our MEAN application is set to run on port 3000.

# "maccam912/meanjs:latest" is the image we’ll use for this container.

# The -i flag is for interactive mode, and -t is to allocate a pseudo terminal. 
# This allow us to connect our terminal with the stdin and stdout streams of the container. 
# More about this http://stackoverflow.com/questions/22272401/what-does-it-mean-to-attach-a-tty-std-in-out-to-dockers-or-lxc

# The argument bash hooks us into the container where we will run the required commands to get our MEAN application running

docker run -i -t --name mymeanjs --link mymongodb:db_1 -p 80:3000 maccam912/meanjs:latest bash

# Now we're in our container. running "ls" command shows you various folders. We're interested in Development one
# cd into it

cd Development/ 

# Cloning the meanjs web application from github

git clone https://github.com/meanjs/mean.git meanjs

# cd into our MEAN.JS folder. 

cd meanjs

# run npm install to download all the package dependencies

npm install

# Install the front-end dependencies running by running bower. 
# We're logged in as the super user, bower gives us error. 
# But it does give us an option to still run it by using the –allow-root option

bower install --allow-root

# Running grunt task
# I got error during running it due to node version
# so forcing it explicitly to run

grunt build --force

# The Web App we downloaded looks for a configuration flag called NODE_ENV, which we will set to production 
# using default grunt task to run the application
# This also had issues due to the node version not letting few dependencies to be installed
# Thus forcing it to run

NODE_ENV=production grunt --force

# This completes the installation and starts running our web application
# add rule 80 in your AWS EC2 instance
# access the web app using URL from the public DNS column







 
