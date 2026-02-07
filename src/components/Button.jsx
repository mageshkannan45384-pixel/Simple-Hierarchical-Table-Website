const Button = ({
  children,
  onClick,
  variant = "primary",
  loading = false,
}) => {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-600 hover:bg-red-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-4 py-2 text-white rounded ${styles[variant]} disabled:opacity-50`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
