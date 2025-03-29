## Documentation for InteraUI library (React Components)

Welcome to the official documentation for `InteraUI`, a modular and reusable component library built with React. This documentation provides an overview of the available components, installation instructions, usage examples, and customization options.

---

## Installation

To install `intera-ui` in your project, use npm:

```bash
npm install @elizabthpazp/intera-ui
```

Or with yarn:

```bash
yarn add @elizabthpazp/intera-ui
```

---

## Usage

To start using `InteraUI`, ensure you have React installed in your project. Import the required components and integrate them into your application.

### Example Implementation

```jsx
import "@elizabthpazp/intera-ui/dist/globals.css";
import { ButtonCard } from '@elizabthpazp/intera-ui';


function App() {
  const [userData, setUserData] = useState(null);

  const handleLogin = (email, password, rememberMe) => {
    setUserData({ email, password, rememberMe }); 
  };

  return <ButtonCard title={'Login'} darkMode={true} onLogin={handleLogin}></ButtonCard>;
}

export default App;
```

---

## Customization

Each component in `intera-ui` supports various props to allow customization. Refer to the detailed component documentation for specific properties and styling options.

---

## Contributing

If you would like to contribute to `intera-ui`, please follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/elizabthpazp/intera-ui.git
   ```
2. Navigate to the project directory:
   ```bash
   cd intera-ui
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development environment:
   ```bash
   npm run dev
   ```
5. Create a new branch and make your changes.
6. Submit a pull request for review.

---

## Deployment

To deploy your project using `InteraUI`, you can integrate it with your React application and host it on platforms like Vercel or Netlify.

For Next.js deployments, refer to the official [Next.js deployment documentation](https://nextjs.org/docs/deployment).

---

For more details, visit the [GitHub Repository](https://github.com/elizabthpazp/intera-ui).
