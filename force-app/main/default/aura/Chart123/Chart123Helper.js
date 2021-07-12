({
	createGraph : function(cmp, temp) {
        
        
        var el = cmp.find('barChart').getElement();
        var ctx = el.getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Qtr-1", "Qtr-2", "Qtr-3", "Qtr-4"],
                datasets: [
                    {
					type: 'bar',
					label: "Income",
					data: [99999,210000,258900,475669,402569],
					fill: true,
					backgroundColor: 'rgba(42, 180, 192, .3)',
					borderWidth: 1,
					borderColor: '#166269',
					hoverBackgroundColor: '#2ab4c0',
					hoverBorderColor: '#2ab4c0',
					stack: 'Income'
				  }, {
					type: 'bar',
					label: "Income Expected",
					data: [33114,215000,320000,412236,385569],
					fill: true,
					backgroundColor: 'rgba(76, 135, 185, .4)',
					borderWidth: 1,
					borderColor: '#2a587f',
					hoverBackgroundColor: '#4c87b9',
					hoverBorderColor: '#2a587f',
					stack: 'Income'
				  }, {
					type: 'bar',
					label: "Expenditures",
					data: [,204560,256987,236981,365587],
					fill: true,
					backgroundColor: 'rgba(243, 82, 58, .3)',
					borderWidth: 1,
					borderColor: '#f3523a',
					hoverBackgroundColor: '#f56954',
					hoverBorderColor: '#f3523a',
					stack: 'Expenditures'
				  }, {
					type: 'bar',
					label: "Expenditures Expected",
					data: [,269877,325698, 435887, 423369],
					fill: true,
					backgroundColor: 'rgba(228, 58, 69, .4)',
					borderWidth: 1,
					borderColor: '#b32a33',
					hoverBackgroundColor: '#e43a45',
					hoverBorderColor: '#b32a33',
					stack: 'Expenditures'
				  }, {
					label: "Balance",
					type: 'bar',
					data: [9999,54400,19013,14569,24998],
					fill: true,
					borderColor: '#1ebfae',
					backgroundColor: 'rgba(30, 191, 174, .3)',
					borderWidth: 1,
					hoverBackgroundColor: '#1ebfae',
					hoverBorderColor: '#099486',
					stack:'Balance'
				  }

                ]
            }
        });
	},
})