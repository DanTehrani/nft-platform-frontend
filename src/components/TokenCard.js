import React, { Component } from 'react';
import { withStyles, Card, CardMedia, CardContent,Typography } from '@material-ui/core';

const styles = {
	grid: {
		flexGrow: 1,
	},
	card: {
		marginLeft: 50,
		marginRight: 50,
		marginTop: 50,
		maxWidth: 400,
	},
	textField: {
		flexGrow: 1,
		width: 200,
	},
	button: {
	},
	image: {
		maxWidth: 400
	}
};

class MyAccount extends Component {
	render() {
		const {
			classes,
			title,
			description,
			image
		} = this.props;

		return (
			<Card className={classes.card} align='center'>
				<CardMedia title={title}>
					<img src={image} className={classes.image} />
				</CardMedia>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
					<Typography component="p">
						{description}
					</Typography>
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(MyAccount);
