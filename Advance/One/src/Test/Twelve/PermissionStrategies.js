// PermissionStrategies.js

import { STRATEGY } from "./constant";

// POINT : Base Strategy Class
class PermissionStrategy {
  match(myPermissions, allowedPermissions) {
    throw new Error("match method must be implemented in derived class");
  }
}

// POINT : Any Match Strategy
class AnyMatchStrategy extends PermissionStrategy {
  match(myPermissions, allowedPermissions) {
    for (const module in allowedPermissions) {
      if (
        myPermissions[module]?.some((perm) =>
          allowedPermissions[module].includes(perm)
        )
      ) {
        return true;
      }
    }
    return false;
  }
}

// POINT : All Match Strategy
class AllMatchStrategy extends PermissionStrategy {
  match(myPermissions, allowedPermissions) {
    for (const module in allowedPermissions) {
      if (
        !myPermissions[module] ||
        !allowedPermissions[module].every((perm) =>
          myPermissions[module].includes(perm)
        )
      ) {
        return false;
      }
    }
    return true;
  }
}

// POINT : Threshold Match Strategy
class ThresholdMatchStrategy extends PermissionStrategy {
  constructor(threshold = 1) {
    super();
    this.threshold = threshold;
  }

  match(myPermissions, allowedPermissions) {
    let matchCount = 0;

    for (const module in allowedPermissions) {
      if (myPermissions[module]) {
        matchCount += allowedPermissions[module].filter((perm) =>
          myPermissions[module].includes(perm)
        ).length;
      }
    }

    return matchCount >= this.threshold;
  }
}

// Strategy Factory
class StrategyFactory {
  static getStrategy(strategy, threshold) {
    switch (strategy) {
      case STRATEGY.ANY:
        return new AnyMatchStrategy();
      case STRATEGY.ALL:
        return new AllMatchStrategy();
      case STRATEGY.THRESHOLD:
        return new ThresholdMatchStrategy(threshold);
      default:
        throw new Error(`Strategy "${strategy}" is not implemented`);
    }
  }
}

export {
  StrategyFactory,
  AnyMatchStrategy,
  AllMatchStrategy,
  ThresholdMatchStrategy,
};
