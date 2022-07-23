import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import {
  Image, Keyboard, StyleSheet,
  Text, TouchableWithoutFeedback, View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { IconApp2 } from '../../assets';
import {
  ButtonComponent, Gap, Input2, LinkComponent,
} from '../../component';
import { databaseRef, login, signInSocialMedia } from '../../config';
import { setLoading } from '../../redux';
import {
  colors,
  fonts,
  loginSchema,
  onLogScreenView, showError, showSuccess, storeData, windowHeight, windowWidth,
} from '../../utils';

function LoginScreen({ navigation }) {
  const stateGlobal = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    onLogScreenView('LoginScreen');
    GoogleSignin.configure({
      webClientId: '231507293953-m4pb80fh8rrjqn44f51v405524200squ.apps.googleusercontent.com',
    });
  }, []);

  const loginUser = ({ email, password }) => {
    dispatch(setLoading(true));
    login(email, password)
      .then((res) => {
        dispatch(setLoading(false));
        databaseRef()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then((resDB) => {
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('DashboardPokemonScreen');
              showSuccess('Login Success');
            }
          });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        if (err.code === 'auth/invalid-email') {
          showError('That email address is invalid!');
        }
        showError(err.message);
      });
  };

  async function onGoogleButtonPress() {
    dispatch(setLoading(true));
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return signInSocialMedia(googleCredential);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, width: null, backgroundColor: colors.background.secondary }} />
        </View>
        <Animatable.View
          style={styles.animation}
          animation="fadeInUp"
          delay={1200}
        >
          <Image style={styles.imageAnimation} source={IconApp2} />
          <Text style={styles.animationText}>My Pokemon</Text>
        </Animatable.View>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Login</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => { loginUser(values); }}
            validationSchema={loginSchema}
          >
            {({
              handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty,
            }) => (
              <View>
                <Input2 leftIcon="email" label="Email" onChangeText={handleChange('email')} value={values.email} onBlur={handleBlur('email')} />
                {errors.email && touched.email ? (
                  <Text
                    style={styles.errorText}
                  >
                    {errors.email}
                  </Text>
                ) : null}

                <Input2
                  label="password"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  secureTextEntry
                  leftIcon="key"
                />
                {errors.password && touched.password ? (
                  <Text
                    style={styles.errorText}
                  >
                    {errors.password}
                  </Text>
                ) : null}

                <View style={styles.linkWrapper}>
                  <LinkComponent
                    title="Forgot Password?"
                    color={colors.text.primary}
                    size={12}
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                    align="right"
                  />
                </View>
                <View style={styles.iconWrapper}>
                  <ButtonComponent
                    iconHeight={25}
                    iconWidth={25}
                    type="icon-button"
                    label="Google"
                    onPress={() => onGoogleButtonPress().then((res) => {
                      analytics().logEvent('Login', {
                        method: 'Google',
                      });
                      analytics().setUserId(res.user.uid);
                      analytics().setUserProperty('Login_with', 'Google');
                      const data = {
                        fullname: res.user.displayName,
                        email: res.user.email,
                        uid: res.user.uid,
                        photo: res.user.photoURL,
                        bio: 'null',
                      };
                      dispatch(setLoading(false));
                      showSuccess('Login Sukses');
                      navigation.replace('DashboardPokemonScreen');
                      databaseRef()
                        .ref(`users/${res.user.uid}/`)
                        .set(data);
                      storeData('user', data);
                    })
                      .catch((err) => {
                        dispatch(setLoading(false));
                        showError(err.message);
                      })}
                  />
                </View>
                <Gap height={30} />
                <ButtonComponent title="Login" onPress={handleSubmit} disable={!(dirty && isValid) || stateGlobal.isLoading} />
              </View>
            )}

          </Formik>

          <View style={styles.goRegisterWrapper}>
            <Text style={styles.registerTitle}>
              Don&lsquo;t have an account?
              {' '}
            </Text>
            <LinkComponent disable={stateGlobal.isLoading} title="Register" color={colors.text.primary} size={12} onPress={() => navigation.replace('RegisterScreen')} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  linkWrapper: {
    alignItems: 'flex-end',
    marginLeft: windowWidth / 2,
    marginTop: 6,
  },

  bottomView: {
    backgroundColor: colors.background.primary,
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  loginText: {
    fontFamily: fonts.primary[700],
    fontSize: 20,
    marginTop: 12,
    marginBottom: 4,
    color: colors.text.primary,

  },

  loginButton: {
    backgroundColor: colors.text.secondary,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    alignSelf: 'center',
    fontSize: 18,
  },
  registerText: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.black,
  },
  fpText: {
    marginTop: -10,
    alignSelf: 'flex-end',
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.secondary,
  },
  goRegisterWrapper: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 12,
    color: colors.text.black,
  },

  animation: {
    position: 'absolute',
    top: windowHeight * 0.1,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  animationText: {
    color: colors.text.tertiary,
    fontFamily: fonts.secondary.pokemonStyle2,
    textShadowColor: colors.shadowText,
    textShadowRadius: 10,
    textShadowOffset: { width: 5, height: 5 },
    fontSize: 30,
    shadowColor: colors.background.secondary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  iconWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },

  imageAnimation: {
    width: windowWidth * 0.27,
    height: windowHeight * 0.15,
  },

  errorText: {
    fontFamily: fonts.primary[400],
    color: colors.warning,
    fontSize: 12,
  },

});
