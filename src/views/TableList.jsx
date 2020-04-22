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
import {Grid, Row, Col, Table, Button} from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Card from "components/Card/Card.jsx";
import { jobsColumnNames, registeredJobsColumnNames } from "variables/Variables.jsx";
import {StatsCard} from "../components/StatsCard/StatsCard";


class TableList extends Component {
  constructor(props){
    super(props);
    this.state = {
      completed: [],
      active: [],
      registered: [],
      numActiveJobs: 0,
      numCompletedJobs: 0,
      username: ""
    }
  }

  async loadUsername() {
    try {
      const res = await fetch('http://localhost:5000/username');
      return await res.text();
    } catch(e) {
      console.log(e);
      return "";
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

  reformatJobsData(jobsData, fieldNames) {
    const jobArray = [];
    for(var k = 0; k < jobsData.length; k++) {
      const map = jobsData[k]
      const currentRow = []
      for(const fieldName of fieldNames) {
        currentRow.push(map[fieldName])
      }
      jobArray.push(currentRow)
    }
    return jobArray
  }

  updateJobsData(newJobsData) {
    if (newJobsData.length === 0) {
      return;
    }
    const newRegisteredJobArray = this.reformatJobsData(newJobsData.registered,
      [
        'jobName', 'driverLambdaName', 'shufflingBucket', 'inputSource',
        'outputSource', 'registeredTime', 'totalNumPipelines', 'totalNumStages'
      ])
    const newCompletedJobArray = this.reformatJobsData(newJobsData.completed,
      [
        'jobName', 'shufflingBucket', 'inputSource', 'outputSource',
        'submissionTime', 'duration', 'totalNumPipelines', 'totalNumStages'
      ])
    const newActiveJobArray = this.reformatJobsData(newJobsData.active,
      [
        'jobName', 'shufflingBucket', 'inputSource', 'outputSource',
        'submissionTime', 'duration', 'totalNumPipelines', 'totalNumStages'
      ])
    this.setState({
      'registered': newRegisteredJobArray,
      'completed': newCompletedJobArray,
      'active': newActiveJobArray,
      'numActiveJobs': newActiveJobArray.length,
      'numCompletedJobs': newCompletedJobArray.length
    })
  }

  componentWillMount() {
    this.loadUsername().then(username => {
      this.setState({
        'username': username
      })
    })
    this.loadNewData().then(newJobsData => {
      this.updateJobsData(newJobsData)
    })
    this.interval = setInterval(async () => {
      await this.loadNewData().then(newJobsData => {
        this.updateJobsData(newJobsData)
      })
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onClickHandler = (e, prop) => {
    this.props.history.push({
      pathname: "job-information",
      state: { jobName: prop[0] }
    })
    // this.props.history.push("job-information");
  }
  // onClickHandler(prop) {
  //   // console.log(e)
  //   console.log(prop)
  //   this.props.history.push({
  //     pathname: "job-information",
  //     state: { jobName: prop }
  //   })
  //   // this.props.history.push("job-information");
  // }

  async invokeJob(jobName, driverLambdaName) {
    try {
      await fetch('http://localhost:5000/invoke-job?'.concat('job-name=', jobName,
        '&driver-lambda-name=', driverLambdaName));
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={5} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-user text-warning" />}
                statsText="AWS Account ID"
                statsValue={this.state.username}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-folder text-success" />}
                statsText="Active jobs"
                statsValue={this.state.numActiveJobs}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-folder text-success" />}
                statsText="Completed jobs"
                statsValue={this.state.numCompletedJobs}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Registered Jobs"
                category="Current registered jobs"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                    <tr>
                      {registeredJobsColumnNames.map((prop, key) => {
                        return <th key={key} style={{'textAlign': 'center', 'verticalAlign': 'middle'}}>{prop}</th>;
                      })}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.registered.map((prop, key) => {
                      return (
                        <tr>
                          {prop.map((prop, key) => {
                            return <td key={key} style={{'textAlign': 'center', 'verticalAlign': 'middle'}}>
                              {prop}
                            </td>;
                          })}
                          <td key={8}>
                            <Button bsClass="btn btn-primary" onClick={async () => {
                              await this.invokeJob(prop[0], prop[1])
                            }}>
                              Run
                            </Button>
                          </td>
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
                title="Active Jobs"
                category="Current active jobs"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {jobsColumnNames.map((prop, key) => {
                          return <th key={key} style={{'textAlign': 'center', 'verticalAlign': 'middle'}}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.active.map((prop, key) => {
                        return (
                          <tr key={key} onClick={(e) => this.onClickHandler(e, prop)}>
                            {prop.map((prop, key) => {
                              return <td key={key} style={{'textAlign': 'center', 'verticalAlign': 'middle'}}>
                                {prop}
                              </td>;
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
                          return <th key={key} style={{'textAlign': 'center', 'verticalAlign': 'middle'}}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.completed.map((prop, key) => {
                        return (
                          <tr key={key} onClick={(e) => this.onClickHandler(e, prop)}>
                            {prop.map((prop, key) => {
                              return <td key={key} style={{'textAlign': 'center', 'verticalAlign': 'middle'}}>
                                {prop}
                              </td>;
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
