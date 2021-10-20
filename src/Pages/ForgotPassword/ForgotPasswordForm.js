import React, { Component } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'

export default class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                email: '',
            },
            typed: false,
        }
    }

    handleChange = (event) => {
        const { formData } = this.state
        formData[event.target.name] = event.target.value
        this.setState({ formData })
        console.log(`Password updated`, formData)
    }

    handleSubmit = () => {
        const { onSubmit } = this.props

        this.setState({ typed: true }, () => {
            this.setState({ typed: false })
            onSubmit(this.state.formData)
        })
    }

    render() {
        const { formData, typed } = this.state

        return (
            <Grid align="center">
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    style={{
                        marginTop: 15,
                        width: 300,
                    }}
                >
                    <TextValidator
                        label="Your email address"
                        onChange={this.handleChange}
                        name="email"
                        value={formData.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['Bạn phải nhập email', 'Đây không phải email']}
                        fullWidth
                    />
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={typed}
                        style={{
                            margin: '20px 0px 20px 0px',
                        }}
                    >
                        {(typed && 'Send email') || (!typed && 'Send email')}
                    </Button>
                </ValidatorForm>
            </Grid>
        )
    }
}
