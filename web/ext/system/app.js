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
			{name: 'turbidity', mapping: 'turbidity',type: 'float'}
		]
	    	
	});
	
	//WaterQuality  Store
	var store = Ext.create('Ext.data.Store', {
	    model: 'WaterQualityModel',
		autoLoad:true,
	    proxy: {
	        type: 'ajax',
	        url : extPath+'/waterQualityManagement/listWaterQualitys.action',
	        actionMethods : {
				read : 'POST'
			},
	        reader: {
	            type: 'json',
	            root: 'waterQualitys',
	            totalProperty:'totalCount'
	        }
	    },
	    listeners : {
			beforeload : {
				fn : function(store, options) {
					//Ext.apply(store.proxy.extraParams,{'cycle': 'year'});
				}
			}
		}
	});
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
	var temperatureChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		animate: false,
		store: store,
		axes: [{
		    title: 'Water Temperature',
		    type: 'Numeric',
		    position: 'left',
		    fields: ['temperature'],
		    grid: true,
		    minimum: 0,
		    maximum: 30,
			//labelTitle: {font: '13px Arial'},
			label: {font: '12px Arial'}
		},{
		    type: 'Time',
		    position: 'bottom',
		    fields: 'date',
		    title: 'Standard Value:-2-30℃',
		    dateFormat: 'm/d ga',
		    //groupBy: 'year,month,day',
		    //aggregateOp: 'sum',
		    constrain: true,
		    grid: true,
		    //labelTitle: {font: '13px Arial'},
			label: {font: '10px Arial'}
		}],
		theme: 'Red',

		series: [{
			//title: 'Core 2 (3.4GHz)',
		    type: 'line',
		    lineWidth: 4,
		    //showMarkers: false,
		    //fill: true,
		    axis: 'left',
		    xField: 'date',
		    yField: 'temperature',
		    style: {
		        'stroke-width': 1
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
	//chlorinity
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
	var chlorinityChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		animate: false,
		store: store,
		axes: [{
		    title: 'Water Chlorinity',
		    type: 'Numeric',
		    position: 'left',
		    fields: ['chlorinity'],
		    grid: true,
		    minimum: 0,
		    maximum: 0.1,
			//labelTitle: {font: '13px Arial'},
			label: {font: '12px Arial'}
		},{
		    type: 'Time',
		    position: 'bottom',
		    fields: 'date',
		    title: 'Standard Value:0.003-0.005Cl‰',
		    dateFormat: 'm/d ga',
		    //groupBy: 'year,month,day',
		    //aggregateOp: 'sum',
		    constrain: true,
		    grid: true,
		    //labelTitle: {font: '13px Arial'},
			label: {font: '10px Arial'}
		}],
		theme: 'Purple',

		series: [{
			//title: 'Core 2 (3.4GHz)',
		    type: 'line',
		    lineWidth: 4,
		    //showMarkers: false,
		    //fill: true,
		    axis: 'left',
		    xField: 'date',
		    yField: 'chlorinity',
		    style: {
		        'stroke-width': 1
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
	
	
	
	//PH Value
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
                /*,renderer: function(v, cellValues, rec) {
                	return v+'℃';
            	}*/
        }]
    });
	var phValueChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		animate: false,
		store: store,
		axes: [{
		    title: 'Water PH Value',
		    type: 'Numeric',
		    position: 'left',
		    fields: ['phValue'],
		    grid: true,
		    minimum: 0,
		    maximum: 12,
			//labelTitle: {font: '13px Arial'},
			label: {font: '12px Arial'}
		},{
		    type: 'Time',
		    position: 'bottom',
		    fields: 'date',
		    title: 'Standard Value:7-9',
		    dateFormat: 'm/d ga',
		    //groupBy: 'year,month,day',
		    //aggregateOp: 'sum',
		    constrain: true,
		    grid: true,
		    //labelTitle: {font: '13px Arial'},
			label: {font: '10px Arial'}
		}],
		theme: 'Green',

		series: [{
			//title: 'Core 2 (3.4GHz)',
		    type: 'line',
		    lineWidth: 4,
		    //showMarkers: false,
		    //fill: true,
		    axis: 'left',
		    xField: 'date',
		    yField: 'phValue',
		    style: {
		        'stroke-width': 1
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
	
	//Salinity
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
                dataIndex: 'salinity'
                ,renderer: function(v, cellValues, rec) {
                	return v+'‰';
            	}
        }]
    });
	var salinityChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		animate: false,
		store: store,
		axes: [{
		    title: 'Water Salinity',
		    type: 'Numeric',
		    position: 'left',
		    fields: ['salinity'],
		    grid: true,
		    minimum: 0,
		    maximum: 45,
			//labelTitle: {font: '13px Arial'},
			label: {font: '12px Arial'}
		},{
		    type: 'Time',
		    position: 'bottom',
		    fields: 'date',
		    title: 'Standard Value:12-43‰',
		    dateFormat: 'm/d ga',
		    //groupBy: 'year,month,day',
		    //aggregateOp: 'sum',
		    constrain: true,
		    grid: true,
		    //labelTitle: {font: '13px Arial'},
			label: {font: '10px Arial'}
		}],
		theme: 'Yellow',

		series: [{
			//title: 'Core 2 (3.4GHz)',
		    type: 'line',
		    lineWidth: 4,
		    //showMarkers: false,
		    //fill: true,
		    axis: 'left',
		    xField: 'date',
		    yField: 'salinity',
		    style: {
		        'stroke-width': 1
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
		
	//Dissolved Oxygen
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
                dataIndex: 'dissolvedOxygen'
                ,renderer: function(v, cellValues, rec) {
                	return v+'mg/L';
            	}
        }]
    });
	var dissolvedOxygenChart = Ext.create('Ext.chart.Chart', {
		flex: 1,
		theme: 'Category1',
		animate: false,
		store: store,
		axes: [{
		    title: 'Water Dissolved Oxygen',
		    type: 'Numeric',
		    position: 'left',
		    fields: ['dissolvedOxygen'],
		    grid: true,
		    minimum: 0,
		    maximum: 9,
		 	//labelTitle: {font: '13px Arial'},
			label: {font: '12px Arial'}
		},{
		    type: 'Time',
		    position: 'bottom',
		    fields: 'date',
		    title: 'Standard Value:4-9mg/L',
		    dateFormat: 'm/d ga',
		    //groupBy: 'year,month,day',
		    //aggregateOp: 'sum',
		    constrain: true,
		    grid: true,
		    //labelTitle: {font: '13px Arial'},
			label: {font: '10px Arial'}
		}],
		theme: 'Blue',

		series: [{
			//title: 'Core 2 (3.4GHz)',
		    type: 'line',
		    lineWidth: 4,
		    //showMarkers: false,
		    //fill: true,
		    axis: 'left',
		    xField: 'date',
		    yField: 'dissolvedOxygen',
		    style: {
		        'stroke-width': 1
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
                    
                    this.setTitle("Salinity Information");
       				dissolvedOxygenGridStore.loadData(data);
                    dissolvedOxygenGrid.setSize(480, 130);
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
	    	items: [,'-',{
		        xtype: 'datefield',
		        id:'startTime',
		        anchor: '100%',
		        fieldLabel: 'From',
		        labelWidth:30,
		        name: 'from_date',
		        maxValue: new Date(),  // limited to the current date or prior
		       	value: new Date(),
		       	format: 'Y-m-d H:i:s'
		    }, {
		        xtype: 'datefield',
		        id:'endTime',
		        anchor: '100%',
		        fieldLabel: 'To',
		        labelWidth:20,
		        name: 'to_date',
		        maxValue: new Date(),
		        value: new Date(),// defaults to today
		        format: 'Y-m-d H:i:s'  
		    },'-',
		    /*
		    {
	            xtype: 'timefield',
	            fieldLabel: 'Time',
	            labelWidth:30,
	            name: 'time1',
	            minValue: '8:00am',
	            maxValue: '6:00pm',
	            tooltip: 'Enter a time'
	           
	        },{
	            xtype: 'timefield',
	            fieldLabel: 'To',
	            labelWidth:20,
	            name: 'time2',
	            minValue: '8:00am',
	            maxValue: '6:00pm',
	            tooltip: 'Enter a time'
	           
	        },'-',*/
	        {
	            xtype: 'button', // default for Toolbars
	            text: 'Seach',
	        	handler: function(){
	        		Ext.apply(store.proxy.extraParams,{
	        			'cycle': null
	        			,'startTime': dateFormat(Ext.getCmp('startTime').getValue())
	        			,'endTime': dateFormat(Ext.getCmp('endTime').getValue())
	        		});
	        		store.load();
	        	}
	        },'-',{
	            xtype: 'button', // default for Toolbars
	            text: 'Seach Week',
	        	handler: function(){
	        		Ext.apply(store.proxy.extraParams,{
	        			'cycle': 'week'
	        			,'startTime':  dateFormat(Ext.getCmp('startTime').getValue())
	        			,'endTime':null
	        		});
	        		store.load();
	        	}
	        },'-',{
	            xtype: 'button', // default for Toolbars
	            text: 'Seach Month',
	        	handler: function(){
					Ext.apply(store.proxy.extraParams,{
	        			'cycle': 'month'
	        			,'startTime':  dateFormat(Ext.getCmp('startTime').getValue())
	        			,'endTime':null
	        		});
	        	
	        		store.load();
	        	}
	        },'-',{
	            xtype: 'button', // default for Toolbars
	            text: 'Seach Year',
	        	handler: function(){
	        		Ext.apply(store.proxy.extraParams,{
	        			'cycle': 'year'
	        			,'startTime': dateFormat(Ext.getCmp('startTime').getValue())
	        			,'endTime':null
	        		});
	        		store.load();
	        	}
	        }]
	    },{
            flex: 1,
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [temperatureChart,phValueChart,dissolvedOxygenChart]
        }, {
            flex: 1,
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [salinityChart,chlorinityChart]
        }]
    });  		
        		
	/*定时刷新数据 */
	/*
	var intr = setInterval(function() {
       store.load();
    }, 1000);
    */
});