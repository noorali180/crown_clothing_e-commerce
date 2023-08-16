import SignIn from '../../components/sign-in-form/sign-in-form.component';
import SignUp from '../../components/sign-up-form/sign-up-form.component';
import './authentication.scss';

const Authentication = () => {
    return (
        <section className='authentication-container'>
            <SignIn />
            <SignUp />
        </section>
    );
}

export default Authentication;
