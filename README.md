# Exam Project 1 - Online Shop

This is the code repository for the final exam in year 1 of Frontend Development studies at Noroff School of Technology and Media.
The students are tasked with planning, designing, developing, deploying, testing and documenting a fictional e-commerce application, with user login, cart and checkout system.
The exam period started 13.04.2026 and ended 24.05.2026 (6 weeks full-time). Students only had this time period to work on and complete the project.

- **Live site:** https://tobhan8.github.io/exam-project-1/
- **Technical report and reflections (PDF):** [docs/technical-report-and-reflection.pdf](docs/technical-report-and-reflection.pdf)

## Main features

- Online Shop - Fictional e-commerce brand and API provided by Noroff (no assets provided other than fictional products)
- User registration, log in and log out features with Noroff's Auth API
- Multi-page application
- Custom header component
- Custom carousel component
- Custom toast notification system
- Cart system
- Custom error classes
- Share button that copies product link to clipboard
- Dynamically generated star icons based on rating numbers
- Modular JavaScript
- Lighthouse score of 100 in accessibility, best practices and SEO
- Thorough technical report with reflections - [read the PDF](docs/technical-report-and-reflection.pdf)

## Getting started

### Prerequisites

- Code editor
- Web browser

### Running the project

This is a fictional e-commerce store for educational purposes. No real products or money are tied to this project.

Use the Live Server extension or similar to serve the project in the browser from your code editor.
You can also visit the deployment of the live site with this link: https://tobhan8.github.io/exam-project-1/

### Creating a test account

Anyone can browse the pages and add items to the cart. In order to go through the checkout process, you have to be logged in to an account.

Anyone can register and log in to a new account. It doesn't need to be an actual Noroff email address; it just needs to end with `@stud.noroff.no`.

It is recommended to use mock data or fictional information when you are creating username, email and password. Don't use a password you use in real-world applications. It's recommended to use `12345678` as password.

1. Navigate to the register page
2. Follow the validation requirements and fill out the form. Notifications will guide you.
3. When you get the "Successfully registered" notification, you will be navigated to the login page automatically.
4. Fill in the login form with your newly registered credentials and log in.
5. Now you can access the checkout page

## Documentation

- [Technical report and reflections (PDF)](docs/technical-report-and-reflection.pdf)

## Technologies

- Vanilla JavaScript
- Vanilla HTML
- Vanilla CSS
- Figma (design and prototyping)
- [Noroff API v2](https://docs.noroff.dev/docs/v2): [Online Shop](https://docs.noroff.dev/docs/v2/basic/online-shop), [Register](https://docs.noroff.dev/docs/v2/auth/register) and [Login](https://docs.noroff.dev/docs/v2/auth/login) endpoints
- GitHub Pages (hosting)

## Assignment brief

<details>
<summary>Brief and instructions copied from Noroff's Moodle platform</summary>

### Goal of the assignment

Demonstrate your ability to interpret a brief and apply the skills learned in the FED1 program by planning, designing, building, testing, and deploying a responsive e-commerce web application for a fictional client.

### Learning outcomes

Upon successful completion, you will demonstrate your:

- Insight into industry-relevant standards for project and product preparation, presentation and delivery.
- Vocational knowledge within front-end development accumulated through the courses in the first and second semester.
- Ability to apply knowledge to practical problems within the field of study with focus on the development of dynamic web solutions.
- Competencies in using tools, techniques and expressions for developing dynamic web solutions in accordance with guidelines for universal design.
- Ability to study and document a project and identify issues and what measures need to be implemented.
- Ethical attitude in relation to practicing the discipline and the ability to create trust and relationships with colleagues from adjacent fields and to clients.
- Ability to carry out work in web design and develop simple interactive web solutions, either individually or as part of an interdisciplinary group.

### Brief and objectives

#### Description

Build the front-end user interface for an e-commerce application. You must create a responsive web app that allows users to view products, add items to a cart, and complete purchases. The final submission must allow a user to register, log in, and purchase products.

#### Technical Requirements

You must follow the tech stack exactly unless this brief explicitly says otherwise.

- Language/Framework: Vanilla JavaScript only (no frameworks).
- No CSS or JavaScript Frameworks are permitted (this includes Tailwind, Bootstrap, Vue, Svelte, React and similar packages)
- Prototyping tool: Figma
- You must use the Noroff API.

#### Functional Requirements/Process: Pages & User Stories

**Product Feed Page**

- Method: `GET /online-shop`
- Path: `/index.html`
- Requirements: The Product Feed Page must include a carousel and a list of at least 12 products
- User Stories:
  - As a user, I want to see an interactive banner carousel on the product feed page, so that I can view a rotation of three products
  - As a user, I want to click on the previous or next button in the carousel to animate and reveal another product, to ensure I can see different products easily
  - As a user, I want the carousel to return to the first product after reaching the end of the list, and vice versa when clicking previous on the first product
  - As a user, I want to click on a button for each carousel item, which will take me to the product page, where I can view more details
  - As a user, I want to view a list of the 12 products in a responsive thumbnail grid on the product feed page, so I can easily select which product to view
  - As a user, I want each thumbnail image in the product feed to be clickable, taking me to the product page to see more details about that specific product

**Specific Product Page**

- Method: `GET /online-shop/<id>`
- Path: `/product/index.html`
- Requirements: The Specific Product Page features more details about a specific product that was navigated to from the thumbnail of the Product Feed Page
- User Stories:
  - As a user, I want to see a responsive layout showing the product's title, description, price, discounted price (if applicable), rating, reviews, and tags fetched from the API
  - As a user, I want each specific product page to have a "share" icon with a shareable URL (including a query string or hash parameter containing the product ID), so I can share the product with others easily
  - As the user, when logged in, I want an "Add to Cart" button on the product page, so I can add products to my shopping cart

**Account Login Page**

- Method: `POST /auth/login`
- Path: `/account/login.html`
- User Stories:
  - As a user, I want a validated login form that allows me to request and save a token to my browser by entering my email and password, allowing me to make purchases

**Account Register Page**

- Method: `POST /auth/register`
- Path: `/account/register.html`
- User Stories:
  - As a user, I want a validated register form that allows me to create a new account by entering my email and password

**Cart Page**

- Path: `/cart/index.html`
- User Stories:
  - As a user, I want to view all products I've added to my cart on a dedicated cart page
  - As a user, I want to see the total price of all items in my cart
  - As a user, I want to adjust the quantity of items in my cart
  - As a user, I want to remove items from my cart
  - As a user, I want to clear all items from my cart with one action
  - As a user, I want a "Proceed to Checkout" button that takes me to the checkout page

**Checkout Page**

- Path: `/checkout/index.html`
- User Stories:
  - As a user, I want to fill out a delivery address form with my details
  - As a user, I want to select from various payment methods (functionality not required - form only)
  - As a user, I want a "Complete Purchase" button that submits my order and takes me to a success page

**Success Page**

- Path: `/success/index.html`
- User Stories:
  - As a user, I want to see a success message confirming my purchase was completed
  - As a user, I want to have the option to return to the product feed page

</details>

## Author

[tobhan8](https://github.com/TobHan8) - Tobias Hanevik
