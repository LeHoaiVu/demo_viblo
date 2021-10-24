import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { green } from '@material-ui/core/colors'
import { styled } from '@material-ui/core'

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
        backgroundColor: green[700],
    },
}))

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
            },
            submitted: false,
        }
    }

    handleChange = (event) => {
        const { formData } = this.state
        formData[event.target.name] = event.target.value
        this.setState({ formData })
    }

    handleSubmit = () => {
        const { onSubmit } = this.props

        this.setState({ submitted: true }, () => {
            setTimeout(() => {
                this.setState({ submitted: false })
            }, 3000)
            onSubmit(this.state.formData)
        })
    }

    render() {
        const { formData, submitted } = this.state
        return (
            <Grid align="center">
                <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                    <TextValidator
                        label="First name"
                        onChange={this.handleChange}
                        name="firstName"
                        value={formData.firstName}
                        validators={['required']}
                        errorMessages={['You have to input first name']}
                        style={{ width: 300 }}
                    />
                    <br />
                    <TextValidator
                        label="Last name"
                        onChange={this.handleChange}
                        name="lastName"
                        value={formData.lastName}
                        validators={['required']}
                        errorMessages={['You have to input last name']}
                        style={{ width: 300 }}
                    />
                    <br />
                    <TextValidator
                        label="User Name"
                        onChange={this.handleChange}
                        name="userName"
                        value={formData.userName}
                        validators={['required']}
                        errorMessages={['You have to input user name']}
                        style={{ width: 300 }}
                    />
                    <br />
                    <TextValidator
                        label="Email"
                        onChange={this.handleChange}
                        name="email"
                        value={formData.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['You have to input email', 'This is not an email']}
                        style={{ width: 300 }}
                    />
                    <br />
                    <TextValidator
                        label="Password"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        value={formData.password}
                        validators={['required', 'minStringLength: 8']}
                        errorMessages={['You have to input password', 'You have to input at least 8 characters']}
                        style={{ width: 300 }}
                    />
                    <br />
                    {submitted ? (
                        <ColorButton
                            variant="contained"
                            type="submit"
                            style={{
                                marginTop: 20,
                            }}
                        >
                            Register is success
                        </ColorButton>
                    ) : (
                        <Button
                            variant="contained"
                            type="submit"
                            style={{
                                marginTop: 20,
                            }}
                        >
                            Register
                        </Button>
                    )}
                </ValidatorForm>
            </Grid>
        )
    }
}
