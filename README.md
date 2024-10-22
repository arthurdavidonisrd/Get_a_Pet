# Welcome to your Expo app 👋

<h1 align="center">Get a Pet Rest API</h1>
<p align="center" font="bold">
The Get a Pet API is designed to streamline the pet adoption process, connecting individuals looking to adopt animals with available pets. Built using the MVC (Model-View-Controller) architecture in Node.js with Express, the API provides endpoints for managing both users and pets.
</p>

# Main Features of the API:
<p
  >Pet Management:
  
  Pet Registration: Users can register a new pet for adoption, providing information such as the pet's name, age, breed, description, and images.
  List Pets: All pets available for adoption can be retrieved through an endpoint, with optional filters like species, age, and more.
  Pet Details: Specific details of a pet can be viewed, including history, vaccines, and additional information provided by the user who registered the pet.
  Update Pets: Users who registered a pet can update its information, such as adding new data or images.
  Delete Pets: A pet can be removed from the list once it is adopted or no longer available.
</p>

<p>
  User Management:
  
  User Registration: Users can sign up by providing their personal details, such as name, email, and password. Each user has a profile where they can manage their registered pets.
  User Authentication: Authentication is implemented using JWT (JSON Web Token), ensuring that only authenticated users can perform restricted actions like registering, editing, or deleting pets.
  Profile Update: Users can update their personal information, such as email or password.
  Account Deletion: The API allows users to delete their account, which also removes their profile and any associated pets.
</p>

<p>
  Pet Adoption:

  Adoption Request: Users interested in a pet can submit an adoption request, which is linked to the pet and the user who registered it.
  Manage Requests: The pet owner can manage adoption requests, accepting or rejecting offers from potential adopters.
  Adoption History: The API keeps a history of adopted pets, tracking which animals were adopted and by whom.
  
</p>


# Technologies
<div dislplay="flex">
   
<img width="50px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" />
<img width="50px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
<img width="50px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" />



