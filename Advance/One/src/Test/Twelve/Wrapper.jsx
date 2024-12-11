import PropTypes from "prop-types";
import { StrategyFactory } from "./PermissionStrategies";
import { STRATEGY } from "./constant";

const Wrapper = ({
  children,
  allowedPermission,
  strategy = STRATEGY.ANY,
  myPermissions,
  threshold = 1,
  fallback = null, // Optional fallback UI when an error occurs
}) => {
  let strategyInstance;

  try {
    // Attempt to get the appropriate strategy instance
    strategyInstance = StrategyFactory.getStrategy(strategy, threshold);
  } catch (error) {
    // Log error to the console
    console.error(
      `[Wrapper Component]: Invalid strategy "${strategy}". Valid strategies are: ${Object.values(
        STRATEGY
      ).join(", ")}`
    );

    // Optional: Render fallback UI
    return (
      fallback || (
        <div style={{ color: "red" }}>
          An error occurred: Invalid permission strategy selected.
        </div>
      )
    );
  }

  // Evaluate permissions
  const hasPermission = strategyInstance.match(
    myPermissions,
    allowedPermission
  );

  // Render children only if permissions are satisfied
  if (!hasPermission) return null;

  return <>{children}</>;
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  allowedPermission: PropTypes.object.isRequired,
  strategy: PropTypes.oneOf(Object.values(STRATEGY)), // Automatically ensures valid strategies
  myPermissions: PropTypes.object.isRequired,
  threshold: PropTypes.number, // Optional, only needed for THRESHOLD strategy
  fallback: PropTypes.node, // Optional fallback UI when an error occurs
};

export default Wrapper;
