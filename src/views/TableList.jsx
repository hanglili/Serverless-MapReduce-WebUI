/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Card from "components/Card/Card.jsx";
import { jobsColumnNames, completedJobsData, activeJobsData } from "variables/Variables.jsx";
import {StatsCard} from "../components/StatsCard/StatsCard";


class TableList extends Component {
  constructor(props){
    super(props);
    this.state = {
      completed: [],
      active: []
    }
  }

  async loadNewData() {
    try {
      const res = await fetch('http://localhost:5000/jobs');
      return await res.json();
    } catch(e) {
      console.log(e);
      return [];
    }
  }

  componentWillMount() {
    this.loadNewData().then(newJobsData => {
      const newCompletedJobArray = [];
      for(var i = 0; i < newJobsData.completed.length; i++) {
        const map = newJobsData.completed[i]
        const currentRow = []
        currentRow.push(map['jobName'])
        currentRow.push(map['shufflingBucket'])
        currentRow.push(map['inputSource'])
        currentRow.push(map['outputSource'])
        currentRow.push(map['submissionTime'])
        currentRow.push(map['duration'])
        currentRow.push(map['totalNumPipelines'])
        currentRow.push(map['totalNumStages'])
        newCompletedJobArray.push(currentRow)
      }
      const newActiveJobArray = [];
      for(var j = 0; j < newJobsData.active.length; j++) {
        const map = newJobsData.active[j]
        const currentRow = []
        currentRow.push(map['jobName'])
        currentRow.push(map['shufflingBucket'])
        currentRow.push(map['inputSource'])
        currentRow.push(map['outputSource'])
        currentRow.push(map['submissionTime'])
        currentRow.push(map['duration'])
        currentRow.push(map['totalNumPipelines'])
        currentRow.push(map['totalNumStages'])
        newActiveJobArray.push(currentRow)
      }
      this.setState({
        'completed': newCompletedJobArray,
        'active': newActiveJobArray
      })
    })
  }

  onClickHandler = (e, prop) => {
    this.props.history.push({
      pathname: "job-information",
      state: { jobName: prop[0] }
    })
    // this.props.history.push("job-information");
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-user text-warning" />}
                statsText="Username"
                statsValue="hanglili"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-folder text-success" />}
                statsText="Total jobs"
                statsValue="123"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Active Jobs"
                category="Current active jobs"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {jobsColumnNames.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {activeJobsData.map((prop, key) => {
                        return (
                          <tr key={key} onClick={e => this.onClickHandler(e, prop)}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                title="Completed Jobs"
                category="Current completed jobs"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {jobsColumnNames.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {completedJobsData.map((prop, key) => {
                        return (
                          <tr key={key} onClick={this.onClickHandler}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

// export default TableList;
export default withRouter(TableList);
