Ext.onReady(function(){

    
    
	function dateFormat(value){ 
	    if(null != value){ 
	        return Ext.Date.format(new Date(value),'Y-m-d H:i:s'); 
	    }else{ 
	        return null; 
	    } 
	} 
	//WaterQuality  Model
	Ext.define('WaterQualityModel', {
	    extend: 'Ext.data.Model',
	    fields: [{name: 'id',mapping: 'id', type: 'int'},
	    	{name: 'date', mapping: 'createDate',type: 'date'},
	    	{name: 'chlorinity', mapping: 'chlorinity',type: 'float'},
			{name: 'temperature', mapping: 'temperature',type: 'float'},
			{name: 'salinity', mapping: 'salinity',type: 'float'},
			{name: 'phValue', mapping: 'phValue',type: 'float'},
			{name: 'dissolvedOxygen', mapping: 'dissolvedOxygen',type: 'float'},
			{name: 'turbidity', mapping: 'turbidity',type: 'float'},
			{name: 'conductivity', mapping: 'conductivity'}
		]
	    	
	});
	
	//WaterQuality  Store
	var waterQualityStore = Ext.create('Ext.data.Store', {
	    model: 'WaterQualityModel',
		autoLoad:true,
	    proxy: {
	        type: 'ajax',
	        url : extPath+'/waterQualityManagement/findRealTimesData.action',
	        actionMethods : {
				read : 'POST'
			},
	        reader: {
	            type: 'json',
	            root: 'waterQuality',
	            totalProperty:'totalCount'
	        }
	    }
	});
	//all chart
	var temperatureChart,chlorinityChart,phValueChart,salinityChart,dissolvedOxygenChart,conductivityChart;
	var timeAxis,chlorinityTimeAxis,phValueTimeAxis,salinityTimeAxis,dissolvedOxygenTimeAxis,conductivityTimeAxis;
  
    var generateData = (function() {
        var data = [], i = 0,
            last = false,
            date = new Date(),
            seconds = +date;
        return function() {
            data = data.slice();
            waterQualityStore.load({  
	            callback:function(records,options,success){  
	                if(success){
		                if(records[0].data){
		                	data.push({
					            date:  records[0].data.date,
					            chlorinity: records[0].data.chlorinity,
					            temperature: records[0].data.temperature,
					            salinity: records[0].data.salinity,
					            phValue: records[0].data.phValue,
					            dissolvedOxygen: records[0].data.dissolvedOxygen,
					            turbidity: records[0].data.turbidity,
					            conductivity:records[0].data.conductivity,
					            id: records[0].data.id
					        });
		                }
	                } 
	            }  
	        });
            last = data[data.length -1];
            return data;
        };
    })();


	var store = Ext.create('Ext.data.JsonStore', {
        fields: ['date', 'chlorinity', 'temperature', 'salinity', 'phValue', 'dissolvedOxygen', 'turbidity','conductivity'],
        data: generateData()
    });
    	
    var intr = setInterval(function() {
        var gs = generateData();
        var toDate = timeAxis.toDate,
            lastDate = gs[gs.length - 1].date,
            markerIndex = temperatureChart.markerIndex || 0;
        if (+toDate < +lastDate) {
            markerIndex = 1;
            
            timeAxis.toDate = lastDate;
            timeAxis.fromDate = Ext.Date.add(Ext.Date.clone(timeAxis.fromDate), Ext.Date.SECOND, 5);
            temperatureChart.markerIndex = markerIndex;
            //chlorinityTimeAxis
            chlorinityTimeAxis.toDate = lastDate;
            chlorinityTimeAxis.fromDate = Ext.Date.add(Ext.Date.clone(timeAxis.fromDate), Ext.Date.SECOND, 5);
            chlorinityChart.markerIndex = markerIndex;
            //phValueTimeAxis
            phValueTimeAxis.toDate = lastDate;
            phValueTimeAxis.fromDate = Ext.Date.add(Ext.Date.clone(timeAxis.fromDate), Ext.Date.SECOND, 5);
            phValueChart.markerIndex = markerIndex;
            
            //salinityTimeAxis
            salinityTimeAxis.toDate = lastDate;
            salinityTimeAxis.fromDate = Ext.Date.add(Ext.Date.clone(timeAxis.fromDate), Ext.Date.SECOND, 5);
            salinityChart.markerIndex = markerIndex;
            
            //dissolvedOxygenChart dissolvedOxygenTimeAxis
            dissolvedOxygenTimeAxis.toDate = lastDate;
            dissolvedOxygenTimeAxis.fromDate = Ext.Date.add(Ext.Date.clone(timeAxis.fromDate), Ext.Date.SECOND, 5);
            dissolvedOxygenChart.markerIndex = markerIndex;
            
            
            conductivityTimeAxis.toDate = lastDate;
            conductivityTimeAxis.fromDate = Ext.Date.add(Ext.Date.clone(timeAxis.fromDate), Ext.Date.SECOND, 5);
            conductivityChart.markerIndex = markerIndex;
        }
        store.loadData(gs);
    }, 5000);
    
    //Temperature
    var temperatureGridStore = Ext.create('Ext.data.JsonStore', {
        fields: ['date', 'temperature']
    });
    	
    var temperatureGrid = Ext.create('Ext.grid.Panel', {
        store: temperatureGridStore,
        height: 130,
        width: 200,
        columns: [{
                text   : 'Time',
                dataIndex: 'date',
                width: 140,
            	renderer: Ext.util.Format.dateRenderer('Y/m/d g:i:s a')
        },{
                text   : 'Temperature',
                dataIndex: 'temperature',
                renderer: function(v, cellValues, rec) {
                	return v+'℃';
            	}
        }]
    });
	temperatureChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		store: store,
		shadow: false,
        animate: true,
		axes: [{
		    type: 'Numeric',
	   		minimum: 0,
		    maximum: 30,
            position: 'left',
            fields: ['temperature'],
            title: 'Water Temperature',
            grid: {
                odd: {
                    fill: '#dedede',
                    stroke: '#ddd',
                    'stroke-width': 0.5
                }
            },
			label: {font: '12px Arial'}
		},{
 	  		type: 'Time',
            position: 'bottom',
            fields: 'date',
            title: 'Standard Value:-2-30℃',
            dateFormat: 'Y-m-d H:i:s',
            groupBy: 'year,month,day',
            aggregateOp: 'sum',
            constrain: true,
            fromDate: new Date(),
            toDate: Ext.Date.add(new Date(), Ext.Date.SECOND,59) ,
            grid: true,
			label: {font: '12px Arial'}
		}],
		theme: 'Red',

		series: [{
			type: 'line',
			smooth: false,
			axis: ['left', 'bottom'],
			xField: 'date',
			yField: 'temperature',
			label: {
			display: 'none',
			field: 'temperature',
			renderer: function(v) { return v >> 0; },
				'text-anchor': 'middle'
			},
			markerConfig: {
				radius: 5,
				size: 5
			},
		    tips: {
                trackMouse: true,
                width: 250,
                height: 70,
                layout: 'fit',
                items: {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [temperatureGrid]
                },
                renderer: function(klass, item) {
                    var storeItem = item.storeItem,
                     data = [{
                                date: storeItem.get('date'),
                                temperature: storeItem.get('temperature')
                            }], i, l, html;
                    
                    this.setTitle("Temperature Information");
       				temperatureGridStore.loadData(data);
                    temperatureGrid.setSize(480, 130);
                }
            }
		}]
	});
	
	//Chlorinity chlorinity
    var chlorinityGridStore = Ext.create('Ext.data.JsonStore', {
        fields: ['date', 'chlorinity']
    });
    	
    var chlorinityGrid = Ext.create('Ext.grid.Panel', {
        store: chlorinityGridStore,
        height: 130,
        width: 200,
        columns: [{
                text   : 'Time',
                dataIndex: 'date',
                width: 140,
            	renderer: Ext.util.Format.dateRenderer('Y/m/d g:i:s a')
        },{
                text   : 'Chlorinity',
                dataIndex: 'chlorinity',
                renderer: function(v, cellValues, rec) {
                	return v+'Cl‰';
            	}
        }]
    });
	chlorinityChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		store: store,
		shadow: false,
        animate: true,
		axes: [{
		    type: 'Numeric',
		    minimum: 0,
		    maximum: 0.1,
            position: 'left',
            fields: ['chlorinity'],
            title: 'Water Chlorinity',
            grid: {
                odd: {
                    fill: '#dedede',
                    stroke: '#ddd',
                    'stroke-width': 0.5
                }
            },
			label: {font: '12px Arial'}
		},{
 	  		type: 'Time',
            position: 'bottom',
            fields: 'date',
            title: 'Standard Value:0.003-0.005Cl‰',
            dateFormat: 'Y-m-d H:i:s',
            groupBy: 'year,month,day',
            aggregateOp: 'sum',

            constrain: true,
            fromDate: new Date(),
            toDate: Ext.Date.add(new Date(), Ext.Date.SECOND,59) ,
            grid: true,
			label: {font: '10px Arial'}
		}],
		theme: 'Purple',

		series: [{
			type: 'line',
			smooth: false,
			axis: ['left', 'bottom'],
			xField: 'date',
			yField: 'chlorinity',
			label: {
			display: 'none',
			field: 'chlorinity',
			renderer: function(v) { return v >> 0; },
				'text-anchor': 'middle'
			},
			markerConfig: {
				radius: 5,
				size: 5
			},
		    tips: {
                trackMouse: true,
                width: 250,
                height: 70,
                layout: 'fit',
                items: {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [chlorinityGrid]
                },
                renderer: function(klass, item) {
                    var storeItem = item.storeItem,
                     data = [{
                                date: storeItem.get('date'),
                                chlorinity: storeItem.get('chlorinity')
                            }], i, l, html;
                    
                    this.setTitle("Chlorinity Information");
       				chlorinityGridStore.loadData(data);
                    chlorinityGrid.setSize(480, 130);
                }
            }
		}]
	});
	
	//PH Value phValue
    var phValueGridStore = Ext.create('Ext.data.JsonStore', {
        fields: ['date', 'phValue']
    });
    	
    var phValueGrid = Ext.create('Ext.grid.Panel', {
        store: phValueGridStore,
        height: 130,
        width: 200,
        columns: [{
                text   : 'Time',
                dataIndex: 'date',
                width: 140,
            	renderer: Ext.util.Format.dateRenderer('Y/m/d g:i:s a')
        },{
                text   : 'PH Value',
                dataIndex: 'phValue'
        }]
    });
	phValueChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		store: store,
		shadow: false,
        animate: true,
		axes: [{
		    type: 'Numeric',
		    minimum: 0,
		    maximum: 12,
            position: 'left',
            fields: ['phValue'],
            title: 'Water PH Value',
            grid: {
                odd: {
                    fill: '#dedede',
                    stroke: '#ddd',
                    'stroke-width': 0.5
                }
            },
			label: {font: '12px Arial'}
		},{
 	  		type: 'Time',
            position: 'bottom',
            fields: 'date',
            title: 'Standard Value:7-9',
            dateFormat: 'Y-m-d H:i:s',
            groupBy: 'year,month,day',
            aggregateOp: 'sum',

            constrain: true,
            fromDate: new Date(),
            toDate: Ext.Date.add(new Date(), Ext.Date.SECOND,59) ,
            grid: true,
			label: {font: '10px Arial'}
		}],
		theme: 'Green',
		series: [{
			type: 'line',
			smooth: false,
			axis: ['left', 'bottom'],
			xField: 'date',
			yField: 'phValue',
			label: {
			display: 'none',
			field: 'phValue',
			renderer: function(v) { return v >> 0; },
				'text-anchor': 'middle'
			},
			markerConfig: {
				radius: 5,
				size: 5
			},
		    tips: {
                trackMouse: true,
                width: 250,
                height: 70,
                layout: 'fit',
                items: {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [phValueGrid]
                },
                renderer: function(klass, item) {
                    var storeItem = item.storeItem,
                     data = [{
                                date: storeItem.get('date'),
                                phValue: storeItem.get('phValue')
                            }], i, l, html;
                    
                    this.setTitle("PH Value Information");
       		    	phValueGridStore.loadData(data);
                    phValueGrid.setSize(480, 130);
                }
            }
		}]
	});
	
	// Salinity salinity
    var salinityGridStore = Ext.create('Ext.data.JsonStore', {
        fields: ['date', 'salinity']
    });
    	
    var salinityGrid = Ext.create('Ext.grid.Panel', {
        store: salinityGridStore,
        height: 130,
        width: 200,
        columns: [{
                text   : 'Time',
                dataIndex: 'date',
                width: 140,
            	renderer: Ext.util.Format.dateRenderer('Y/m/d g:i:s a')
        },{
                text   : 'Salinity',
                dataIndex: 'salinity',
                renderer: function(v, cellValues, rec) {
                	return v+'‰';
            	}
        }]
    });
	salinityChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		store: store,
		shadow: false,
        animate: true,
		axes: [{
		    type: 'Numeric',
		    minimum: 0,
		    maximum: 45,
            position: 'left',
            fields: ['salinity'],
            title: 'Water Salinity',
            grid: {
                odd: {
                    fill: '#dedede',
                    stroke: '#ddd',
                    'stroke-width': 0.5
                }
            },
			label: {font: '12px Arial'}
		},{
 	  		type: 'Time',
            position: 'bottom',
            fields: 'date',
            title: 'Standard Value:12-43‰',
            dateFormat: 'Y-m-d H:i:s',
            groupBy: 'year,month,day',
            aggregateOp: 'sum',

            constrain: true,
            fromDate: new Date(),
            toDate: Ext.Date.add(new Date(), Ext.Date.SECOND,59) ,
            grid: true,
			label: {font: '10px Arial'}
		}],
		theme: 'Yellow',

		series: [{
			type: 'line',
			smooth: false,
			axis: ['left', 'bottom'],
			xField: 'date',
			yField: 'salinity',
			label: {
			display: 'none',
			field: 'salinity',
			renderer: function(v) { return v >> 0; },
				'text-anchor': 'middle'
			},
			markerConfig: {
				radius: 5,
				size: 5
			},
		    tips: {
                trackMouse: true,
                width: 250,
                height: 70,
                layout: 'fit',
                items: {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [salinityGrid]
                },
                renderer: function(klass, item) {
                    var storeItem = item.storeItem,
                     data = [{
                                date: storeItem.get('date'),
                                salinity: storeItem.get('salinity')
                            }], i, l, html;
                    
                    this.setTitle("Salinity Information");
       		    salinityGridStore.loadData(data);
                    salinityGrid.setSize(480, 130);
                }
            }
		}]
	});
	
	//Dissolved Oxygen dissolvedOxygen
    var dissolvedOxygenGridStore = Ext.create('Ext.data.JsonStore', {
        fields: ['date', 'dissolvedOxygen']
    });
    	
    var dissolvedOxygenGrid = Ext.create('Ext.grid.Panel', {
        store: dissolvedOxygenGridStore,
        height: 130,
        width: 200,
        columns: [{
                text   : 'Time',
                dataIndex: 'date',
                width: 140,
            	renderer: Ext.util.Format.dateRenderer('Y/m/d g:i:s a')
        },{
                text   : 'Dissolved Oxygen',
                dataIndex: 'dissolvedOxygen',
                renderer: function(v, cellValues, rec) {
                	return v+'mg/L';
            	}
        }]
    });
	dissolvedOxygenChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		store: store,
		shadow: false,
        animate: true,
		axes: [{
		    type: 'Numeric',
			minimum: 0,
		    maximum: 9,
            position: 'left',
            fields: ['dissolvedOxygen'],
            title: 'Water Dissolved Oxygen',
            grid: {
                odd: {
                    fill: '#dedede',
                    stroke: '#ddd',
                    'stroke-width': 0.5
                }
            },
			label: {font: '10px Arial'}
		},{
 	  		type: 'Time',
            position: 'bottom',
            fields: 'date',
            title: 'Standard Value:4-9mg/L',
            dateFormat: 'Y-m-d H:i:s',
            groupBy: 'year,month,day',
            aggregateOp: 'sum',

            constrain: true,
            fromDate: new Date(),
            toDate: Ext.Date.add(new Date(), Ext.Date.SECOND,59) ,
            grid: true,
			label: {font: '10px Arial'}
		}],
		theme: 'Blue',

		series: [{
			type: 'line',
			smooth: false,
			axis: ['left', 'bottom'],
			xField: 'date',
			yField: 'dissolvedOxygen',
			label: {
			display: 'none',
			field: 'dissolvedOxygen',
			renderer: function(v) { return v >> 0; },
				'text-anchor': 'middle'
			},
			markerConfig: {
				radius: 5,
				size: 5
			},
		    tips: {
                trackMouse: true,
                width: 250,
                height: 70,
                layout: 'fit',
                items: {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [dissolvedOxygenGrid]
                },
                renderer: function(klass, item) {
                    var storeItem = item.storeItem,
                     data = [{
                                date: storeItem.get('date'),
                                dissolvedOxygen: storeItem.get('dissolvedOxygen')
                            }], i, l, html;
                    
                    this.setTitle("Dissolved Oxygen Information");
       		    dissolvedOxygenGridStore.loadData(data);
                    dissolvedOxygenGrid.setSize(480, 130);
                }
            }
		}]
	});
		
	//conductivity
	 var conductivityGridStore = Ext.create('Ext.data.JsonStore', {
        fields: ['date', 'conductivity']
    });
    	
    var conductivityGrid = Ext.create('Ext.grid.Panel', {
        store: conductivityGridStore,
        height: 130,
        width: 200,
        columns: [{
                text   : 'Time',
                dataIndex: 'date',
                width: 140,
            	renderer: Ext.util.Format.dateRenderer('Y/m/d g:i:s a')
        },{
                text   : 'Conductivity',
                dataIndex: 'conductivity',
                renderer: function(v, cellValues, rec) {
                	return v+'μS/cm';
            	}
        }]
    });
	conductivityChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		store: store,
		shadow: false,
        animate: true,
		axes: [{
		    type: 'Numeric',
			minimum: 10,
		    maximum: 20000,
            position: 'left',
            fields: ['conductivity'],
            title: 'Water Conductivity',
            grid: {
                odd: {
                    fill: '#dedede',
                    stroke: '#ddd',
                    'stroke-width': 0.5
                }
            },
			label: {font: '10px Arial'}
		},{
 	  		type: 'Time',
            position: 'bottom',
            fields: 'date',
            title: 'Standard Value:10～20000μS/cm',
            dateFormat: 'Y-m-d H:i:s',
            groupBy: 'year,month,day',
            aggregateOp: 'sum',

            constrain: true,
            fromDate: new Date(),
            toDate: Ext.Date.add(new Date(), Ext.Date.SECOND,59) ,
            grid: true,
			label: {font: '10px Arial'}
		}],
		theme: 'Blue',

		series: [{
			type: 'line',
			smooth: false,
			axis: ['left', 'bottom'],
			xField: 'date',
			yField: 'conductivity',
			label: {
			display: 'none',
			field: 'conductivity',
			renderer: function(v) { return v >> 0; },
				'text-anchor': 'middle'
			},
			markerConfig: {
				radius: 5,
				size: 5
			},
		    tips: {
                trackMouse: true,
                width: 250,
                height: 70,
                layout: 'fit',
                items: {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [conductivityGrid]
                },
                renderer: function(klass, item) {
                    var storeItem = item.storeItem,
                     data = [{
                                date: storeItem.get('date'),
                                conductivity: storeItem.get('conductivity')
                            }], i, l, html;
                    
                    this.setTitle("Conductivity Information");
       		    	conductivityGridStore.loadData(data);
                    conductivityGrid.setSize(480, 130);
                }
            }
		}]
	});
	
	
	var viewport = Ext.create('Ext.Viewport', {
	    //xtype: 'panel',
        title: 'System Status',
        width: 800,
	    height: 600,
        //animCollapse:false,
        //constrainHeader:true,
        //border: false,
        layout: {
            type: 'vbox',
            align: 'stretch'    
        },
        bodyStyle: {
            'background-color': '#FFF'
        },
	    items: [{
	    	xtype:'toolbar',
	    	//height: 300,
	    	//width: 400,
	    	//bodyPadding: 10,
	    	items: []
	    },{
            flex: 1,
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [temperatureChart,chlorinityChart,phValueChart]
        }, {
            flex: 1,
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [salinityChart,dissolvedOxygenChart,conductivityChart]
        }]
    });  				
        		
	timeAxis = temperatureChart.axes.get(1);
	chlorinityTimeAxis = chlorinityChart.axes.get(1);
    phValueTimeAxis = phValueChart.axes.get(1);
    salinityTimeAxis =  salinityChart.axes.get(1);
    dissolvedOxygenTimeAxis =  dissolvedOxygenChart.axes.get(1);
    conductivityTimeAxis = conductivityChart.axes.get(1);

});