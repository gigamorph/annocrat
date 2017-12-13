import Anno from './anno';

export default {

  logger: {debug: () => {}, info: () => {}, warning: () => {}, error: () => {}},

  setLogger: function(logger) {
    this.logger = logger;
  },

  /**
   * @param {object} target "on" attribute of an annotation
   * @returns {boolean} true if the target is a canvas fragment, not another annotation
   */
  targetIsAnnotationOnCanvas: function(target) {
    return target['@type'] !== 'oa:Annotation';
  },

  hasTargetOnCanvas: function(annotation) {
    for (let target of Anno(annotation).targets) {
      if (this.targetIsAnnotationOnCanvas(target)) {
        return true;
      }
    }
    return false;
  },

  findAnnotationFromListById(annotationId, annotations) {
    const matched = annotations.filter(anno => {
      if (!anno || typeof anno !== 'object') {
        logger.error('AnnotationUtil#findAnnotationFromListById invalid annotation', anno);
        return false;
      }
      return anno['@id'] === annotationId;
    });
    if (matched.length > 1) {
      logger.error('AnnotationUtil#findAnnotationFromListById duplicate IDs', matched);
    }
    return matched[0];
  },

  // For an annotation that targets other annotation(s), follow the
  // "on" relations recursively until no more targets are found.
  findTransitiveTargetAnnotations: function(annotation, annotationMap) {
    //this.logger.debug('annoUtil.findTransitiveTargetAnnotations annotation:', annotation, 'annotationMap:', annotationMap);
    const $anno = Anno(annotation);
    const targetAnnos = $anno.targets.map(target => {
      const annoId = target.full;
      return annotationMap[annoId];
    }).filter(anno => anno !== undefined && anno !== null);

    if (targetAnnos.length === 0) {
      return [];
    }

    let result = targetAnnos;

    for (let targetAnno of targetAnnos) {
      let tempResult = this.findTransitiveTargetAnnotations(targetAnno, annotationMap);
      result = result.concat(tempResult);
    }
    return result;
  },

  // For an annotation that targets other annotation(s), follow the
  // "on" relations recursively until no more targets are found.
  findTransitiveTargetingAnnotations: function(annotation, annotationMap) {
    //this.logger.debug('annoUtil.findTransitiveTargetingAnnotations annotation:', annotation, 'annotationMap:', annotationMap);
    const $anno = Anno(annotation);
    let targetingAnnos = $anno.targetedBy;

    targetingAnnos = targetingAnnos.filter(anno => {
      const annoInMap = annotationMap[anno['@id']];
      return annoInMap !== undefined && annoInMap !== null;
    });

    if (targetingAnnos.length === 0) {
      return [];
    }
    let result = targetingAnnos;

    for (let targetingAnno of targetingAnnos) {
      let tempResult = this.findTransitiveTargetingAnnotations(targetingAnno, annotationMap);
      result = result.concat(tempResult);
    }
    return result;
  },

  findTargetAnnotationsOnCanvas: function(annotation, annotationMap) {
    //this.logger.debug('AnnotationUtil.findTargetAnnotationsOnCanvas anno:', annotation, 'annoMap:', annotationMap);
    const allTargetAnnos = this.findTransitiveTargetAnnotations(annotation, annotationMap);
    return allTargetAnnos.filter(anno => {
      for (let target of Anno(anno).targets) {
        if (this.targetIsAnnotationOnCanvas(target)) {
          return true;
        }
      }
      return false;
    });
  },

  /**
   * XXX this version of mergeTargets will probably have to be removed
   * because SVG to SVG merge will likely turn out to be illegal against
   * the IIIF spec. The selector SVG of a target should always contains
   * a single path and if multiple targets exist for an annotation,
   * the "on" field should be an array of targets.
   *
   * Merge annotation's target ("on" attribute) with a new "on" attribute (sourceTarget).
   */
  mergeTargetsOld: function(annotation, sourceTarget) {
    const destTarget = annotation.on;
    let destCanvasId = destTarget.full;
    const sourceCanvasId = sourceTarget.full;

    if (destTarget instanceof Array) { // (destination) annotation has (possibly) multiple targets
      const targetsWithSameCanvasId = destTarget.filter(function(on) {
        return on.full === sourceCanvasId;
      });
      if (targetsWithSameCanvasId.length === 1) { // there's a destination target on the same canvas as the source target
        const target = targetsWithSameCanvasId[0];
        target.selector.value = svgUtil.mergeSvgs(target.selector.value, sourceTarget.selector.value);
      } else if (targetsWithSameCanvasId.length === 0) { // there's no existing target on the same canvas
        annotation.on.push(sourceTarget);
      } else {
        throw 'multiple targets on same canvas';
      }
    } else { // (destination) annotation has a single target
      const destTargetId = destTarget.full;
      if (destCanvasId === sourceCanvasId) {
        destTarget.selector.value = svgUtil.mergeSvgs(destTarget.selector.value, sourceTarget.selector.value);
      } else {
        annotation.on = [ destTarget, sourceTarget];
      }
    }
  }
};
