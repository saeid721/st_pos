import { useEffect } from "react";
import { useDispatch } from "react-redux";

const TestComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const testUser = {
      data: {
        token: { access: "testAccess", refresh: "testRefresh" },
        user: { user_type: "admin", user_info: { name: "Test User" } },
      },
    };

    dispatch(setUser(testUser));
  }, [dispatch]);

  return <div>Test</div>;
};

export default TestComponent;
