//console.log("kendo init 1");
//$(document).ready(function () {
//    console.log("kendo init 2");
//        var dataSource = new kendo.data.DataSource({
//            transport: {
//                read: {
//                    url: "./timesheet",
//                    type: "GET",
//                    dataType: "jsonp",
//                    contentType: "application/json"
//                },
//                create: {
//                    url: "./timesheet",
//                    type: "POST",
//                    dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
//                    contentType: "application/json"
//                },
//                update: {
//                    url: "./timesheet",
//                    type: "PUT",
//                    dataType: "jsonp",
//                    contentType: "application/json"
//                },
//                destroy: {
//                    url: "./timesheet",
//                    type: "DELETE",
//                    dataType: "jsonp",
//                    contentType: "application/json"
//                },
//                parameterMap: function (options, operation) {
//                    if (operation !== "read" && options.models) {
//                        return { models: kendo.stringify(options.models) };
//                    }
//                }
//            },
//            batch: true,
//            pageSize: 20,
//            page: 1,
//            autoSync: true,
//            //aggregate: [{
//            //    field: "timesheetTimeSpanBegin",
//            //    aggregate: "sum"
//            //}],
//            //group: {
//            //    field: "timesheetTimeSpanBegin",
//            //    dir: "desc",
//            //    aggregates: [
//            //        { field: "timesheetTimeSpanBegin", aggregate: "sum" }
//            //    ]
//            //},
//            schema: {
//                model: {
//                    id: "ID",
//                    fields: {
//                        ID: { editable: false, nullable: true },
//                        timesheetDescription: { type: "string", editable: true },
//                        timesheetTimeSpanBegin: { type: "date", editable: true },
//                        timesheetTimeSpanEnd: { type: "date", editable: true },
//                        timesheetCompanyID: { type: "number", editable: true },
//                        isDeleted: { type: "boolean", editable: false },
//                    }
//                }
//            }
//        });

//    dataSource.fetch(function () {
//        var timesheets = dataSource.data();
//        /* The result can be observed in the DevTools(F12) console of the browser. */
//        console.log(timesheets[0]); // displays "Secrets of the JavaScript Ninja"
//    });

//    $("#grid").kendoGrid({
//        dataSource: dataSource,
//        columnMenu: {
//            filterable: false
//        },
//        //height: 680,
//        editable: "incell",
//        pageable: true,
//        sortable: true,
//        navigatable: true,
//        resizable: true,
//        reorderable: true,
//        groupable: true,
//        filterable: true,
//        //dataBound: onDataBound,
//        toolbar: ["excel", "pdf", "search"],
//        pdfExport: function(e) {
//            const width = e.sender.wrapper.width();
//            e.sender.wrapperClone.width(width);
//            e.sender.wrapperClone.addClass('k-clone');
//        },
//        columns:
//        [{
//                selectable: true,
//                width: 75,
//                attributes: {
//                    "class": "checkbox-align",
//                },
//                headerAttributes: {
//                    "class": "checkbox-align",
//                }
//            },
//            {
//                field: "timesheetDescription",
//                title: "Timesheet Description",
//                template: "<div class='timesheet-description'>#: timesheetDescription #</div>",
//                width: 300
//            },
//            {
//                command: "destroy", title: "&nbsp;", width: 120
//            }],
//        });
//    });



    //function onDataBound(e) {
    //        var grid = this;
    //grid.table.find("tr").each(function () {
    //            var dataItem = grid.dataItem(this);
    //var themeColor = dataItem.Discontinued ? 'success' : 'error';
    //var text = dataItem.Discontinued ? 'available' : 'not available';

    //$(this).find(".badgeTemplate").kendoBadge({
    //    themeColor: themeColor,
    //text: text,
    //            });

    //$(this).find(".rating").kendoRating({
    //    min: 1,
    //max: 5,
    //label: false,
    //selection: "continuous"
    //            });

    //$(this).find(".sparkline-chart").kendoSparkline({
    //    legend: {
    //    visible: false
    //                },
    //data: [dataItem.TargetSales],
    //type: "bar",
    //chartArea: {
    //    margin: 0,
    //width: 180,
    //background: "transparent"
    //                },
    //seriesDefaults: {
    //    labels: {
    //    visible: true,
    //format: '{0}%',
    //background: 'none'
    //                    }
    //                },
    //categoryAxis: {
    //    majorGridLines: {
    //    visible: false
    //                    },
    //majorTicks: {
    //    visible: false
    //                    }
    //                },
    //valueAxis: {
    //    type: "numeric",
    //min: 0,
    //max: 130,
    //visible: false,
    //labels: {
    //    visible: false
    //                    },
    //minorTicks: {visible: false },
    //majorGridLines: {visible: false }
    //                },
    //tooltip: {
    //    visible: false
    //                }
    //            });

    //kendo.bind($(this), dataItem);
    //        });
    //    }

    //function returnFalse() {
    //        return false;
    //    }

    //function clientCategoryEditor(container, options) {
    //    $('<input required name="Category">')
    //        .appendTo(container)
    //        .kendoDropDownList({
    //            autoBind: false,
    //            dataTextField: "CategoryName",
    //            dataValueField: "CategoryID",
    //            dataSource: {
    //                data: categories
    //            }
    //        });
    //    }

    //function clientCountryEditor(container, options) {
    //    $('<input required name="Country">')
    //        .appendTo(container)
    //        .kendoDropDownList({
    //            dataTextField: "CountryNameLong",
    //            dataValueField: "CountryNameShort",
    //            template: "<div class='dropdown-country-wrap'><img src='../content/web/country-flags/#:CountryNameShort#.png' alt='Kendo UI for jQuery Grid #: CountryNameLong# Flag' title='#: CountryNameLong#' width='30' /><span>#:CountryNameLong #</span></div>",
    //            dataSource: {
    //                transport: {
    //                    read: {
    //                        url: " https://demos.telerik.com/kendo-ui/service/countries",
    //                        dataType: "jsonp"
    //                    }
    //                }
    //            },
    //            autoWidth: true
    //        });
    //    }

    //var categories = [{
    //    "CategoryID": 1,
    //"CategoryName": "Beverages"
    //    }, {
    //    "CategoryID": 2,
    //"CategoryName": "Condiments"
    //    }, {
    //    "CategoryID": 3,
    //"CategoryName": "Confections"
    //    }, {
    //    "CategoryID": 4,
    //"CategoryName": "Dairy Products"
    //    }, {
    //    "CategoryID": 5,
    //"CategoryName": "Grains/Cereals"
    //    }, {
    //    "CategoryID": 6,
    //"CategoryName": "Meat/Poultry"
    //    }, {
    //    "CategoryID": 7,
    //"CategoryName": "Produce"
    //    }, {
    //    "CategoryID": 8,
    //"CategoryName": "Seafood"
    //    }];