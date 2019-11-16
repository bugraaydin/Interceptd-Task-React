import React, { Component } from "react";
import { Grid, Header, Table, Rating, Card, Image, Button, Segment, Divider } from "semantic-ui-react";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pokemonData: null,
      myPokemons: [],
      entryCount: 0,
      api_url: "https://pokeapi.co/api/v2/pokemon"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    // Sending get request to retrieve pokemon list
    var data = await fetch(this.state.api_url);
    data = await data.json();
    this.setState({
      data: data.results,
      entryCount: data.count,
      api_url: data.next
    });
    console.log(data);
  }

  async updatePage() {
    var data = await fetch(this.state.api_url);
    data = await data.json();
    this.setState({
      data: data.results,
      entryCount: data.count,
      api_url: data.next
    });
    console.log(data);
  }

  async handleClick(url) {
    var data = await fetch(url);
    data = await data.json();
    console.log(data);
    this.setState({ pokemonData: data });
  }

  addToMyList(url) {
    this.setState(
      state => {
        const myPokemons = state.myPokemons.concat(url);

        return {
          myPokemons
        };
      }
    );
  }
  
	deleteFromMyList(index) {
		this.setState(
		  state => {
			return {
			  myPokemons: state.myPokemons.filter((_, i) => i !== index)
			};
		  }
		);
	  }

  displayTable = () => {
    if (this.state.data.length > 0) {
      return this.state.data.map(s => {
        return <Card header={s.name} onClick={() => this.handleClick(s.url)} />;
      });
    }
  };

  displayPokemon = () => {
    if (this.state.pokemonData != null) {
      return (
        <Card
          centered
          onClick={() => this.addToMyList(this.state.pokemonData)}
        >
          <Image
            src={this.state.pokemonData.sprites.front_default}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{this.state.pokemonData.name}</Card.Header>
            <Card.Meta>{this.state.pokemonData.id}</Card.Meta>
            {this.state.pokemonData.abilities.map(obj => (
              <Card.Description>{obj.ability.name}</Card.Description>
            ))}
          </Card.Content>
        </Card>
      );
    }
  };

  displayMyPokemons = () => {
    if (this.state.myPokemons.length > 0) {
      return this.state.myPokemons.map((s, index) => {
        return (
        <Card centered
		onClick={() => this.deleteFromMyList(index)}
		>
          <Image
            src={s.sprites.front_default}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{s.name}</Card.Header>
            <Card.Meta>{s.id}</Card.Meta>
            {s.abilities.map(obj => (
              <Card.Description>{obj.ability.name}</Card.Description>
            ))}
          </Card.Content>
        </Card>
		)
      });
    }
  };

  render() {
    return (
      <Segment>
	  <Grid columns={2} relaxed='very'>
	  <Grid.Column>
        <Card.Group>
          <h1 align="center">My Pokemons</h1>
          {this.state.myPokemons.length > 0 && this.displayMyPokemons()}
        </Card.Group>
		</Grid.Column>
		<Grid.Column>
        <Card.Group>
          {this.state.pokemonData != null && this.displayPokemon()}
        </Card.Group>
        <Card.Group>
          {this.state.data != null && this.displayTable()}
        </Card.Group>
        <Button
          centered
          onClick={() => this.updatePage()}
          content="Next Page"
        />
	  </Grid.Column>
	  </Grid>
      </Segment>
    );
  }
}

export default DataTable;
