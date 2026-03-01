'use client'

import { useState } from "react";
import {useTranslations, useLocale} from 'next-intl';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const t = useTranslations('auth');
  const router = useRouter();
  const locale = useLocale();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return t('passwordTooShort');
    }
    if (!/\d/.test(password)) {
      return t('passwordMissingNumber');
    }
    if (!/[a-zA-Z]/.test(password)) {
      return t('passwordMissingLetter');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return t('passwordMissingSpecial');
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = t('usernameRequired');
    }

    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t('confirmPasswordRequired');
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('passwordsNotMatch');
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      if (isLogin) {
        // 登录逻辑 - 使用 NextAuth 的 signIn
        console.log('[登录] 尝试登录，用户名:', formData.username);
        const result = await signIn('credentials', {
          username: formData.username,
          password: formData.password,
          redirect: false,
        });

        console.log('[登录] signIn 结果:', result);

        if (result?.error) {
          console.error('[登录] 登录失败:', result.error);
          setSubmitError(t('loginFailed'));
        } else if (result?.ok) {
          console.log('[登录] 登录成功，准备跳转');
          router.push(`/${locale}`);
          router.refresh();
        } else {
          console.error('[登录] 未知错误，result:', result);
          setSubmitError(t('requestFailed'));
        }
      } else {
        // 注册逻辑
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          })
        });

        if (response.ok) {
          // 注册成功后切换到登录模式
          setIsLogin(true);
          setFormData({ ...formData, password: '', confirmPassword: '' });
          setSubmitError('');
        } else {
          const data = await response.json().catch(() => ({}));
          setSubmitError(data.error || t('registerFailed'));
        }
      }
    } catch (error) {
      setSubmitError(t('requestFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSubmitError('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSubmitError('');
    setFormData({ username: formData.username, password: '', confirmPassword: '' });
  };

  return (
    <div className="login-wrapper">
      <div>
        <div className="login-header">
          <h1>{isLogin ? t('login') : t('register')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {submitError && (
            <div className="error-message global-error">
              {submitError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">
              {t('username')}
              <span className="required">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? 'error' : ''}
              placeholder={t('usernamePlaceholder')}
              disabled={isLoading}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              {t('password')}
              <span className="required">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder={t('passwordPlaceholder')}
              disabled={isLoading}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                {t('confirmPassword')}
                <span className="required">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder={t('confirmPasswordPlaceholder')}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? t('submitting') : (isLogin ? t('loginButton') : t('registerButton'))}
          </button>

          <div className="toggle-mode">
            {isLogin ? t('noAccount') : t('hasAccount')}
            <button
              type="button"
              onClick={toggleMode}
              className="link-button"
              disabled={isLoading}
            >
              {isLogin ? t('registerNow') : t('loginNow')}
            </button>
          </div>
        </form>

        <div className="password-requirements">
          <h3>{t('passwordRequirements')}</h3>
          <ul>
            <li className={formData.password.length >= 6 ? 'met' : ''}>
              {t('requirementLength')}
            </li>
            <li className={/\d/.test(formData.password) ? 'met' : ''}>
              {t('requirementNumber')}
            </li>
            <li className={/[a-zA-Z]/.test(formData.password) ? 'met' : ''}>
              {t('requirementLetter')}
            </li>
            <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'met' : ''}>
              {t('requirementSpecial')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
