import React from "react";

import ReactTable from "react-table";
import store from "../stores/store.js";
import {fetchEvents, fetchTimeInterval, clickOnDemandRefresh, fetchEventsCount} from "../rest/ajax.js";

class EventsComponent extends React.Component {

  constructor(props) {
    super(props)

    store.subscribe(()=>{
      this.forceUpdate();
    });
    
    fetchTimeInterval()
    fetchEvents()
    
    this.state = {
      data: [],
      pagesize: 5,
      previousvalue: "",
      fetchRows: "",
      fetchCount: ""
    }

    this.onSelect = (e) => {
      console.log(e.target.value);
      if (this.state.fetchRows == "") {
        this.state.fetchRows = setInterval(fetchEvents, e.target.value * 1000)
      } else {
        clearInterval(this.state.fetchRows)
        this.state.fetchRows = setInterval(fetchEvents, e.target.value * 1000)
      }

      if (this.state.fetchCount == "") {
        this.state.fetchCount = setInterval(fetchEventsCount, e.target.value * 1000)
      } else {
        clearInterval(this.state.fetchCount)
        this.state.fetchCount = setInterval(fetchEventsCount, e.target.value * 1000)
      }

    }
    // setting default refresh to 5 seconds
    this.state.fetchRows = setInterval(fetchEvents, 5000)
    this.state.fetchCount = setInterval(fetchEventsCount, 5000)
    this.fetchFilteredData = this.fetchFilteredData.bind(this)
    this.clickOnDemandRefresh =  this.clickOnDemandRefresh.bind(this)
  };
  
  fetchFilteredData(filter, row) {
    console.log(filter.Header)
    return (filter.id in row && row[filter.id].includes(filter.value))
  }

  /*callPageChange(pageindex) {
    console.log("tsaf" ,this.state)
    console.log("hello", pageindex)
  }

  callOnPageSizeChange(pgsize) {
    console.log("in callOnPageSizeChange", pgsize)
    this.setState({
      data: this.state.data,
      previousvalue: this.state.previousvalue,
      pagesize: pgsize
    })
  }*/
  
  clickOnDemandRefresh () {
    fetchEvents()
    fetchEventsCount()
  }

  render() {
    const d =  []

    const c = [{
      Header: 'Event Id',
      accessor: 'id'
    }, {
      Header: 'Message',
      accessor: 'message',
      sortable: false
    }, {
      Header: 'Event Type',
      accessor: 'type'
    }, {
      Header: 'IP Address',
      accessor: 'ipaddress'
    },{
      Header: 'Timestamp',
      accessor: 'timestamp'
    }]
    
    return (
      <div>
        <button id="refresh" onClick={this.clickOnDemandRefresh}>Refresh</button>
        <div align='right'>
            Refresh every &nbsp;
            <select onChange={this.onSelect}>
                <option value='0'>Default to 5</option>
                {store.getState().timeInterval.map(unit=>
                    <option key={unit} value={unit}>{unit}</option>
                )}
            </select> seconds
        </div>
        <p/>
        <div>      
          <ReactTable data={store.getState().events} columns={c}
          showPagination={true}
          defaultPageSize={5}          
          filterable
          defaultFilterMethod={this.fetchFilteredData}
          filterAll={true}
          //onPageChange={this.callPageChange}
          //onPageSizeChange={this.callOnPageSizeChange}
          className="-striped -highlight"/>
        </div>
      </div>
    );
  }
}

export default EventsComponent;
