import Anno from 'anno';
import util from './test-util';

const expect = require('chai').expect;

describe('AnnotationWrapper', function() {
  it('should get correct text from the annotation object', function() {
    const text = '<p>Chapter 1</p>';
    const anno = util.createAnnotation({ chars: text });
    expect(Anno(anno).bodyText).to.equal(text);
  });
});
