export const MODULE = {
  ROSTER: "Roster",
  COMPANY: "Company",
  VENDOR: "Vendor",
  DRIVER: "Driver",
  TRIP: "Trip",
  ZONE: "Zone",
  ZONE_TYPE: "Zone Type",
};

export const PERMISSION = {
  CREATE: "Create",
  READ: "Read",
  UPDATE: "Update",
  DELETE: "Delete",
};

export const MY_PERMISSION = {
  [MODULE.ROSTER]: [
    PERMISSION.CREATE,
    PERMISSION.READ,
    PERMISSION.UPDATE,
    PERMISSION.DELETE,
  ],
  [MODULE.COMPANY]: [PERMISSION.CREATE, PERMISSION.DELETE],
};

console.log(MY_PERMISSION);

// StrategyNames.js
export const STRATEGY = Object.freeze({
  ANY: "ANY",
  ALL: "ALL",
  THRESHOLD: "THRESHOLD",
});
