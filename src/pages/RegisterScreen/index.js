import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard, StyleSheet,
  Text, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from '../../assets';
import {
  ButtonComponent, Gap, Input2, LinkComponent,
} from '../../component';
import { databaseRef, register } from '../../config';
import { setLoading } from '../../redux';
import {
  colors,
  fonts,
  onLogScreenView, showError, showSuccess, signupSchema, storeData, windowHeight, windowWidth,
} from '../../utils';

function RegisterScreen({ navigation }) {
  const stateGlobal = useSelector((state) => state);

  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    onLogScreenView('RegisterScreen');
  }, []);

  const onRegister = ({
    email, password, fullname, bio,
  }) => {
    dispatch(setLoading(true));
    register(email, password)
      .then((res) => {
        const data = {
          fullname,
          email,
          bio,
          uid: res.user.uid,
          photo: photoForDB,
        };

        const dataLocal = {
          fullname,
          email,
          uid: res.user.uid,
          bio,
          password,
        };
        dispatch(setLoading(false));
        databaseRef()
          .ref(`users/${res.user.uid}/`)
          .set(data);

        storeData('user', dataLocal);
        showSuccess('Register Success');
        navigation.navigate('LoginScreen');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        if (err.code === 'auth/email-already-in-use') {
          showError('That email address is already in use!');
        }
        if (err.code === 'auth/invalid-email') {
          showError('That email address is invalid!');
        }
        showError(err.message);
      });
  };

  const getImage = () => {
    launchImageLibrary(
      {
        quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true,
      },
      (response) => {
        // console.log('response : ', response);
        if (response.didCancel || response.error) {
          showError('Sepertinya anda tidak memilih fotonya');
        } else {
          const source = response?.assets[0];
          // console.log('response GetImage : ', source);
          setPhotoForDB(`data:${source.type};base64, ${source.base64}`);
          const Uri = { uri: source.uri };
          setPhoto(Uri);
          setHasPhoto(true);
        }
      },
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, width: null, backgroundColor: colors.background.secondary }} />
          <View style={styles.profile}>
            <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
              <Image source={photo} style={styles.avatar} />
              {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
              {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.RegisterText}>Register</Text>
          <Formik
            initialValues={{
              email: '', password: '', fullname: '', bio: '',
            }}
            onSubmit={(values) => { onRegister(values); }}
            validationSchema={signupSchema}
          >
            {({
              handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty,
            }) => (
              <View>
                <Input2 leftIcon="account-circle" label="Fullname" onChangeText={handleChange('fullname')} value={values.fullname} onBlur={handleBlur('fullname')} />
                {errors.fullname && touched.fullname ? (
                  <Text
                    style={styles.errorText}
                  >
                    {errors.fullname}
                  </Text>
                ) : null}

                <Input2
                  label="Bio"
                  onBlur={handleBlur('bio')}
                  onChangeText={handleChange('bio')}
                  value={values.bio}
                  leftIcon="account-circle"
                />
                {errors.bio && touched.bio ? (
                  <Text
                    style={styles.errorText}
                  >
                    {errors.bio}
                  </Text>
                ) : null}
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

                <Gap height={30} />
                <ButtonComponent title="Register" label="Register" onPress={handleSubmit} disable={!(dirty && isValid) || stateGlobal.isLoading} />
              </View>
            )}

          </Formik>

          <View style={styles.goLoginWrapper}>
            <Text style={styles.loginTitle}>
              Already have an account?
              {' '}
            </Text>
            <LinkComponent disable={stateGlobal.isLoading} title="Login" color={colors.text.primary} size={12} onPress={() => navigation.replace('LoginScreen')} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    position: 'absolute',
    top: windowHeight * 0.1,
    alignSelf: 'center',
    color: colors.text.primary,
    fontFamily: 'SourceSansProBold',
    fontSize: 60,
    shadowColor: colors.background.secondary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  linkWrapper: {
    alignItems: 'flex-end',
    marginLeft: windowWidth / 2,
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
  RegisterText: {
    fontFamily: fonts.primary[700],
    fontSize: 20  ,
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
  loginTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 12,
    color: colors.text.primary,
  },
  profile: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    fontFamily: fonts.primary[400],
    color: colors.warning,
    fontSize: 12,
  },
});
