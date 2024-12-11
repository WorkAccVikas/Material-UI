// PermissionMatcher.js
class PermissionMatcher {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  match(myPermissions, allowPermissions) {
    return this.strategy(myPermissions, allowPermissions);
  }
}

// Strategy: Checks if any match is found
const anyMatchStrategy = (myPermissions, allowPermissions) => {
  for (const module in allowPermissions) {
    if (
      myPermissions[module]?.some((perm) =>
        allowPermissions[module].includes(perm)
      )
    ) {
      return true;
    }
  }
  return false;
};

// Usage

const allow = {
  Roster: ["Create"],
  Company: ["Update", "Read", PERMISSION.DELETE],
  //   Trip: ["Create", "Read", "Update", "Delete"],
};

const permissionMatcher = new PermissionMatcher(anyMatchStrategy);
const hasMatch = permissionMatcher.match(MY_PERMISSION, allow);

console.log(hasMatch); // Output: true
