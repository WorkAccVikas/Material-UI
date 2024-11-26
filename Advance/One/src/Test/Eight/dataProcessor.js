// dataProcessor.js
self.onmessage = (event) => {
  const { type, rateData, selectedOptions, reason, initialColumns } =
    event.data;

  switch (type) {
    case "clear": {
      const result = rateData.map((item) => {
        item.rateMaster = item.rateMaster.map((rate) => {
          const filteredRate = Object.keys(rate).reduce((acc, key) => {
            if (
              ["zoneNameID", "zoneTypeID", "guard", "guardPrice"].includes(key)
            ) {
              acc[key] = rate[key];
            }
            return acc;
          }, {});
          return filteredRate;
        });
        return item;
      });
      self.postMessage(result);
      break;
    }
    case "removeOption": {
      const allowedKeys = selectedOptions.flatMap((entry) => [
        entry.columnName,
        `Dual ${entry.columnName}`,
      ]);

      const result = rateData.map((company) => ({
        ...company,
        rateMaster: company.rateMaster.map((rate) => {
          const filteredRate = {};
          allowedKeys.forEach((key) => {
            if (key in rate) {
              filteredRate[key] = rate[key];
            }
          });
          filteredRate.zoneNameID = rate.zoneNameID;
          filteredRate.zoneTypeID = rate.zoneTypeID;
          filteredRate.guard = rate.guard;
          filteredRate.guardPrice = rate.guardPrice;
          return filteredRate;
        }),
      }));
      self.postMessage(result);
      break;
    }
    case "selectOption": {
      const result = rateData.map((company) => ({
        ...company,
        rateMaster: company.rateMaster.map((rm) => {
          selectedOptions.forEach((item) => {
            if (!rm.hasOwnProperty(item.columnName)) {
              rm[item.columnName] = 0;
            }
            if (!rm.hasOwnProperty(`Dual ${item.columnName}`)) {
              rm[`Dual ${item.columnName}`] = 0;
            }
          });
          return rm;
        }),
      }));
      self.postMessage(result);
      break;
    }
    default:
      self.postMessage(rateData); // Default to no changes
  }
};
