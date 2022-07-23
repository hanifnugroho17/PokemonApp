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
import { forgetPassword } from '../../config';
import { setLoading } from '../../redux';
import {
  colors, fonts, forgotPasswordSchema,
  onLogScreenView, showError, showSuccess, windowHeight, windowWidth,
} from '../../utils';

function ForgotPasswordScreen({ navigation }) {
  const stateGlobal = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    onLogScreenView('ForgotPasswordScreen');
  }, []);

  const onSendEmail = ({ email }) => {
    dispatch(setLoading(true));
    forgetPassword(email).then(() => {
      dispatch(setLoading(false));
      showSuccess('Please check your email');
      navigation.navigate('LoginScreen');
    }).catch((err) => {
      dispatch(setLoading(false));
      showError(err.message);
    });
  };

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
          <Text style={styles.ForgotText}>Forgot Password ?</Text>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={(values) => { onSendEmail(values); }}
            validationSchema={forgotPasswordSchema}
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
                <Gap height={100} />
                <ButtonComponent title="Send Email" label="Send Email" onPress={handleSubmit} disable={!(isValid && dirty) || stateGlobal.isLoading} />
              </View>
            )}

          </Formik>
          <View style={styles.goLoginWrapper}>
            <Text style={styles.LoginTitle}>
              Back to Login?
              {' '}
            </Text>
            <LinkComponent disable={stateGlobal.isLoading} title="Login" color={colors.text.primary} size={16} onPress={() => navigation.replace('LoginScreen')} align="center" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  ForgotText: {
    fontFamily: fonts.primary[700],
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
    color: colors.text.primary,
  },

  goLoginWrapper: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  LoginTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.primary,
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
