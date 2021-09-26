import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = () => {
        const {onSubmit} = this.props

        this.setState({ submitted: true }, () => {
            this.setState({submitted: false})
            console.log(`this.state.formData`, this.state.formData)
            onSubmit(this.state.formData)
        });
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <Grid align="center">
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >

                    <TextValidator
                        label="Họ"
                        onChange={this.handleChange}
                        name="firstName"
                        value={formData.firstName}
                        validators={['required']}
                        errorMessages={['Bạn phải nhập họ']}
                        fullWidth
                    />
                    <br />
                    <TextValidator
                        label="Tên"
                        onChange={this.handleChange}
                        name="lastName"
                        value={formData.lastName}
                        validators={['required']}
                        errorMessages={['Bạn phải nhập tên']}
                        fullWidth
                    />
                    <br />
                    <TextValidator
                        label="User Name"
                        onChange={this.handleChange}
                        name="userName"
                        value={formData.userName}
                        validators={['required']}
                        errorMessages={['Bạn phải nhập user name']}
                        fullWidth
                    />
                    <br />
                    <TextValidator
                        label="Email"
                        onChange={this.handleChange}
                        name="email"
                        value={formData.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['Bạn phải nhập email', 'Đây không phải email']}
                        fullWidth
                    />
                    <br />
                    <TextValidator
                        label="Password"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        value={formData.password}
                        validators={['required','minStringLength: 8']}
                        errorMessages={['Bạn phải nhập mật khẩu','Bạn phải nhập tối thiểu 8 ký tự']}
                        fullWidth
                    />
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={submitted}
                        style={{
                            marginTop: 20,
                        }}
                    >
                        {
                            (submitted && 'Đăng Ký Thành Công')
                            || (!submitted && 'Đăng Ký')
                        }
                    </Button>
                </ValidatorForm>
            </Grid>
        );
    }   
}
