import React, { Component } from "react";
import DataTable from "./DataTable.js";
import { Divider, Segment, Image, Grid } from "semantic-ui-react";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      key: 1 //used for renaming components because when we rename key, component re-mounts and states will be re-init.
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Segment size="small">
        <span>
          {" "}
          <h1 align="center">Interceptd Task </h1>
        </span>
        <Image
          src="https://interceptd.com/wp-content/uploads/2018/12/purple-logo.svg"
          size="small"
          centered
        />
        <Divider section />
        <Grid columns={2} relaxed="very" textAlign="center">
          <Grid.Column>
            <DataTable tableData={this.state.tableDataFromChild} />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default LandingPage;
