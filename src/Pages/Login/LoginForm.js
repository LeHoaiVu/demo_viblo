import React, { Component } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                // email: {value: '', errMsg: ''},
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
            this.setState({ submitted: false })
            onSubmit(this.state.formData)
        })
    }

    // handleChangeValidate = ({name, value}) => {
    //     const {formData} = this.state

    //     switch (name) {
    //         case 'email':
    //             // validate
    //             if (value.indexOf('vl') >= 0) {
    //                 this.setState({formData: {...formData, email: {value, errMsg: 'Vui long k noi tuc!!!!'}}})
    //                 return
    //             }

    //             this.setState({formData: {...formData, email: {value, errMsg: ''}}})
    //             break;

    //         default:
    //             break;
    //     }
    // }

    render() {
        const { formData, submitted } = this.state

        return (
            <Grid align="center">
                <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                    <TextValidator
                        label="Email"
                        onChange={this.handleChange}
                        name="email"
                        value={formData.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['Bạn phải nhập email', 'Đây không phải email']}
                        fullWidth
                    />
                    {/* <TextField 
                        label="Email"
                        value={formData.email.value}
                        error={Boolean(formData.email.errMsg)}
                        helperText={formData.email.errMsg}
                        onChange={event => this.handleChangeValidate({name: 'email', value: event.target.value})}
                        fullWidth
                    /> */}
                    <br />
                    <TextValidator
                        label="Password"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        value={formData.password}
                        validators={['required', 'minStringLength: 8']}
                        errorMessages={['Bạn phải nhập mật khẩu', 'Bạn phải nhập tối thiểu 8 ký tự']}
                        className="password"
                        fullWidth
                    />
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={submitted}
                        style={{
                            marginTop: 15,
                        }}
                    >
                        {(submitted && 'Đăng Nhập Thành Công') || (!submitted && 'Đăng Nhập')}
                    </Button>
                </ValidatorForm>
            </Grid>
        )
    }
}
