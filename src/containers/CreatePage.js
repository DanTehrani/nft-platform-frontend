import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles, Grid, CardContent, Typography, TextField, FilledInput, Button, CardMedia, Card } from '@material-ui/core';
import { createToken, cancelCreateToken } from '../actions';
import TokenCard from '../components/TokenCard.js';
import UploadingDialog from '../components/UploadingDialog.js';

export const styles = {
	grid: {
		flexGrow: 1
  },
  card: {
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
}

export class CreatePage extends Component {
	constructor() {
		super();
		this.state = {
			image: undefined,
			title: '',
			description: ''
		};

		this.onTitleChange = this.onTitleChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onFileChange = this.onFileChange.bind(this);
		this.onCreateClick = this.onCreateClick.bind(this);
	}

	onTitleChange(event) {
		this.setState({
			title: event.target.value
		});
	}

  onDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.setState({
        image: e.target.result
      });
    };

    reader.readAsDataURL(file);
	}

	onCreateClick() {
		const {
			title,
			description,
			image
		} = this.state;

		this.props.createToken(title, description, image);
	}

	render() {
		const {
			classes,
			cancelCreateToken,
			uploading
		} = this.props;

		const {
			title,
			description,
			image
		} = this.state;

		return (
      <div>
				<Typography
          align='center'
          variant='h4'
        >Create Token
        </Typography>
        <Grid container
          className={classes.grid}
          spacing={40}
          alignItems='center'
          justify='center'
          direction='column'
          >
          <Grid item>
            <TextField required onChange={this.onTitleChange} className={classes.textField} label='name' margin='normal' />
          </Grid>
          <Grid item>
            <TextField rows={3} variant='outlined' required multiline onChange={this.onDescriptionChange}  label='description' />
          </Grid>
          <Grid item>
            <input onChange={this.onFileChange} ref={ref => this.upload = ref} type='file' accept="image/*" style={{display: 'none'}}/>
            <Button variant='contained' className={classes.button} onClick={() => this.upload.click()} color='primary'>Choose image</Button>
          </Grid>
          <Grid item>
						<Typography align='center' variant='subtitle1' >(Preview)</Typography>
						<br/>
						<TokenCard title={title} description={description} image={image} />
          </Grid>
          <Grid item>
            <Button variant='contained' className={classes.button} onClick={this.onCreateClick} color='primary'>Create</Button>
          </Grid>
        </Grid>
				<UploadingDialog
					open={uploading}
					onCancelClick={cancelCreateToken}
				/>
      </div>
    )
  }
}

const mapStateToProps = state => {
	const {
		uploading
	} = state.create;

	return {
		uploading
	}
}

const mapDispatchToProps = dispatch => {
  return {
    createToken: bindActionCreators(createToken, dispatch),
		cancelCreateToken: bindActionCreators(cancelCreateToken, dispatch),
  }
}

export const CreatePageWithStyles = withStyles(styles)(CreatePage);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreatePage));
