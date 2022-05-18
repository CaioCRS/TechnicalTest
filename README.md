<h4 align="center"> 
	TECHNICAL TEST
</h4>

<p align="center">
 <a href="#-about">About</a> •
 <a href="#-functionalities">Functionalities</a> •
 <a href="#-how-execute-it">How execute it</a> • 
 <a href="#-testing">Testing</a> • 
 <a href="#-final-considerations">Final considerations</a>
</p>

## 💻 About

This project, is a API developed with NodeJS(Javascript), with a connection to database Postgres, running inside a Docker container.

---

## ⚙️ Functionalities

- [x] Category
  - [x] Search categories
  - [x] Search specific category
  - [x] Remove a category
  - [x] Create a category
  - [x] Update name of category
  - [x] Update description of category
  - [x] Update status of category

- [x] Product
  - [x] Search products
  - [x] Search specific product
  - [x] Remove a product
  - [x] Create a product
  - [x] Import products
    - Import a list of products, with category. If the product or/and the category not exists on database, it's inserted dynamically
  - [x] Export products
    - Search products by category
  - [x] Update name of product
  - [x] Update description of product
  - [x] Update status of product
  - [x] Update value of product

---

## 🚀 How execute it

This repository, has follow parts:
1. Backend (NodeJS) 
2. Database (Postgres)

### Requirements

- [x] Git
- [x] NodeJS
- [x] VSCode(Or a IDE of ur preference)
- [x] Docker


#### ⬇️ Clone repository

```bash

# Clone repository
$ git clone https://github.com/CaioCRS/TechnicalTest.git

# Access the path
$ cd TechnicalTest

```

#### 🧭 It's time. Run this

```bash

# Build a image from dockerfile
$ docker build -t techtest .

# Verify tests from application
$ docker run -it -p 3000:3000 techtest

```

All tests re ok?

```bash

# Type control + C on bash to stop Docker
$ 

```

Let's compose!

```bash

# U can verify the tests on docker compose too(Optionally)
$ docker compose run techtest npm test

# Up the ambient, starting the server of API and the Database inside the container
$ docker compose up -d

```

---

## 🛠 Testing

After running the ambient, the server is accessible on your localhost, on port 3000.
The list of methods, you can verify on path "/api-docs/".
> Sample: http://localhost:3000/api-docs/

You need type any character on "Authorize" box, to set the Authorization key on header, and finally, you can test the routes.

---

## 🧁 Final considerations

It was a pleasure to carry out this test. I tried to use some techniques and concepts in order to demonstrate part of my knowledge.

*The fake authorization was just to exemplify what the control would be like. In the authorization phase, it would be possible to validate with JWT, for example.

---