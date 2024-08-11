# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Clone the repository and checkout the test branch
RUN git clone --branch test https://github.com/GCNiraj/legal_aid_center.git .

# Install dependencies
RUN npm install

# Expose the port that the app runs on
EXPOSE 4001

# Define the command to start the application
CMD ["npm", "start"]
