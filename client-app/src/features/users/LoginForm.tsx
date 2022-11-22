import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Header, Label } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { IUserFormValues } from '../../app/models/user';
import * as Yup from 'yup';

export default observer(function LoginForm() {
    const { userStore } = useStore();
    const navigate = useNavigate();

    function handleSubmit(value: IUserFormValues, setErrors: Function, setSubmitting: Function) {
        userStore
            .login(value)
            .then(value => navigate('/activities'))
            .catch(error => setErrors({ error: 'Invalid email or password' }))
            .finally(() => setSubmitting(false));
    }

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(value, { setErrors, setSubmitting }) =>
                handleSubmit(value, setErrors, setSubmitting)
            }
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isValid, dirty, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header
                        as="h2"
                        content="Login to Reactivities"
                        color="teal"
                        textAlign="center"
                    />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />

                    <ErrorMessage
                        name="error"
                        render={() => (
                            <Label
                                style={{ marginBottom: 10 }}
                                basic
                                color="red"
                                content={errors.error}
                            />
                        )}
                    />

                    <Button
                        positive
                        content="Login"
                        type="submit"
                        fluid
                        loading={isSubmitting}
                        disabled={!isValid || !dirty || isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
});
