// publisherController.js
({
    handleClick: function(component, event, helper) {
      var payload = {
        recordId: "001HSGKDHJ6834BHS",
        recordData: {
          accountName: "Amit Singh"
        },
        source: "Aura Component",
        channel: "SFDCPanther"
      };
  
      component.find("sampleMessageChannel").publish(payload);
    }
  });