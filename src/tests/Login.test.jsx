import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const history = createMemoryHistory();

describe('Login page tests', () => {
  it('tests if inputs are being rendered', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEl = screen.getByPlaceholderText(/Insert/i);
    expect(inputEl).toBeInTheDocument();
  });
  // it('', () => {

  // });
  // it('', () => {

  // });
  // it('', () => {

  // });
  // it('', () => {

  // });
  // it('', () => {

  // });
});
