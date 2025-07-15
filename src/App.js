import React, { useState, useEffect } from "react";

// A simple CSS-in-JS solution for styling without a separate CSS file.
const styles = {
  body: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: "20px",
    backgroundColor: "#f0f2f5",
    color: "#333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    marginBottom: "20px",
    borderRadius: "8px",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  navButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
  button: {
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.2s",
    marginRight: "10px",
  },
  buttonDisabled: {
    backgroundColor: "#e9ecef",
    cursor: "not-allowed",
    color: "#6c757d",
  },
  input: {
    width: "calc(100% - 22px)",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  loader: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    margin: "20px auto",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "500px",
    textAlign: "center",
  },
  productList: {
    listStyle: "none",
    padding: 0,
  },
  productItem: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  // Keyframes need to be injected globally
  globalStyle: `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
};

// Helper to inject keyframes animation
const GlobalStyle = () => {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = styles.globalStyle;
  document.head.appendChild(styleEl);
  return null;
};

// --- Components ---

const LoginPage = ({ setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isButtonDisabled = !username || !password;

  const handleLogin = () => {
    if (!isButtonDisabled) {
      // In a real app, this would be a navigation.
      // Here, we just switch the component being rendered by updating state.
      setPage("dashboard");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div style={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          aria-label="Username"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          aria-label="Password"
        />
      </div>
      <button
        onClick={handleLogin}
        disabled={isButtonDisabled}
        style={{
          ...styles.button,
          ...(isButtonDisabled ? styles.buttonDisabled : {}),
        }}
      >
        Log In
      </button>
    </div>
  );
};

const DashboardPage = () => (
  <div>
    <h1>Welcome, Test User</h1>
    <p>You have successfully logged in.</p>
  </div>
);

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    setIsLoading(true);
    setProducts([]);
    // Simulate a network request with a 2-second delay
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Laptop" },
        { id: 2, name: "Mouse" },
        { id: 3, name: "Keyboard" },
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div>
      <h2>Products</h2>
      <button
        onClick={fetchProducts}
        style={styles.button}
      >
        Load Products
      </button>
      {isLoading && (
        <div
          id="loading-spinner"
          style={styles.loader}
        ></div>
      )}
      <ul style={styles.productList}>
        {products.map((p) => (
          <li
            key={p.id}
            className="product-item"
            style={styles.productItem}
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const HomePage = ({ setCartItems }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    // Simulate a delay before the modal appears
    setTimeout(() => setIsModalVisible(true), 500);
  };

  return (
    <div>
      <h2>Home Page</h2>
      <p>This is the main page of our test application.</p>
      <button
        onClick={showModal}
        style={styles.button}
      >
        Show Terms
      </button>
      <hr />
      <h3>Shop Items</h3>
      <button
        onClick={() => setCartItems((c) => c + 1)}
        style={styles.button}
      >
        Add to Cart
      </button>
      <button
        onClick={() => setCartItems((c) => Math.max(0, c - 1))}
        style={styles.button}
      >
        Remove from Cart
      </button>

      {isModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Terms and Conditions</h3>
            <p>Here are the terms and conditions. They are very important.</p>
            <button
              onClick={() => setIsModalVisible(false)}
              style={styles.button}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [page, setPage] = useState("home");
  const [cartItems, setCartItems] = useState(0);

  // A simple router based on component state.
  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <DashboardPage />;
      case "login":
        return <LoginPage setPage={setPage} />;
      case "products":
        return <ProductsPage />;
      case "home":
      default:
        return <HomePage setCartItems={setCartItems} />;
    }
  };

  // The navigate function now only updates the state.
  const navigate = (newPage) => {
    setPage(newPage);
  };

  return (
    <div style={styles.body}>
      <GlobalStyle />
      <header style={styles.header}>
        <h1>Playwright Test App</h1>
        <nav style={styles.nav}>
          <button
            onClick={() => navigate("home")}
            style={styles.navButton}
          >
            Home
          </button>
          <button
            onClick={() => navigate("products")}
            style={styles.navButton}
          >
            Products
          </button>
          <button
            onClick={() => navigate("login")}
            style={styles.navButton}
          >
            Login
          </button>
        </nav>
        <div className="cart-badge">Cart ({cartItems} items)</div>
      </header>
      <main style={styles.container}>{renderPage()}</main>
    </div>
  );
}
