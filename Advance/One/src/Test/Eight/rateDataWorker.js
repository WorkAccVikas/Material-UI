self.onmessage = function (event) {
  const { selectedOptions, currentRateData, vehicleTypeIDs } = event.data;

  const selectedCompanyIds = selectedOptions.map((company) => company._id);

  const rateDataMap = currentRateData.reduce((acc, rate) => {
    acc[rate._id] = rate;
    return acc;
  }, {});

  const updatedRateData = selectedOptions.map((company) => {
    const existingRate = rateDataMap[company._id] || {};

    const initialColumns = {
      zoneNameID: "",
      zoneTypeID: "",
      guard: 0,
      guardPrice: 0,
    };

    const updatedColumns = vehicleTypeIDs.reduce((acc, { columnName }) => {
      return {
        ...acc,
        [columnName]: 0,
        [`Dual ${columnName}`]: 0,
      };
    }, initialColumns);

    return {
      _id: company._id,
      company_name: company.company_name,
      effectiveDate: existingRate.effectiveDate || company.effectiveDate || "",
      billingCycle: existingRate.billingCycle || company.billingCycle || "",
      rateMaster: existingRate.rateMaster || [updatedColumns],
    };
  });

  const result = [...updatedRateData];
  self.postMessage(result);
};
