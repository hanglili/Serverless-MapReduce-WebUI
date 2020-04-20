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
import React, {Component} from "react";
import {
  Grid,
  Row,
  Col,
  Table
} from "react-bootstrap";

import {inDegreeColumnNames, stageStateColomnNames} from "../variables/Variables";
import InDegreeCard from "../components/Card/InDegreeCard";
import StageStateCard from "../components/Card/StageStateCard";
import GraphCard from "../components/Card/GraphCard";

class JobInfo extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <InDegreeCard
                title="In Degree Information"
                category="General information of the current selected job"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                    <tr>
                      {inDegreeColumnNames.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                    </thead>
                    <tbody>
                    {[].map((prop, key) => {
                      return (
                        <tr key={key}>
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
              <Col md={6}>
                <StageStateCard
                  title="Stage State Information"
                  category="General information of the current selected job"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table hover>
                      <thead>
                      <tr>
                        {stageStateColomnNames.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                      </thead>
                      <tbody>
                      {[].map((prop, key) => {
                        return (
                          <tr key={key}>
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
          <Row>
            <Col md={12}>
              <GraphCard
                title="Pipelines Dependencies Information"
                category="General information of the current selected job"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <span>LOADING...</span>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default JobInfo;