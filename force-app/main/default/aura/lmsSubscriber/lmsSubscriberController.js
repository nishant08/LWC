({
    handleMessage: function(cmp, event, helper) {
      // Read the message argument to get the values in the message payload
      if (event != null && event.getParams() != null) {
        let params = event.getParams();
        cmp.set("v.recordValue", JSON.stringify(params, null, "\t"));
      }
    }
  });