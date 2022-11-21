import { Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button } from 'semantic-ui-react';

export default function LoginForm() {
    return (
        <Formik initialValues={{ email: '', password: '' }} onSubmit={value => console.log(value)}>
            {({ handleSubmit, isValid, isSubmitting }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <Button
                        positive
                        content="Login"
                        type="submit"
                        fluid
                        disabled={!isValid || isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
}
