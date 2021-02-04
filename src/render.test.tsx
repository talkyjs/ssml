import React from 'react';
import { renderSSMLToString } from './render';

describe('render', () => {
  describe('renderSSMLToString', () => {
    it('<amadon:domain name="fun">', () => {
      const Fun = () => (
        <amazon-domain name="fun">布団が、ふっとんだ。</amazon-domain>
      );
      expect(renderSSMLToString(<Fun />)).toEqual(
        '<amazon:domain name="fun">布団が、ふっとんだ。</amazon:domain>'
      );
    });
  });
});
