/**
 * ```
 * - particles
 * |- sets
 *  |- particle_name
 * ```
 *
 * @example
 * {{set "particle_name"}}
 * @example
 * {{set "particle_name" foo="bar"}}
 * @example
 * {{set "module:<MODULE>" 'particle_name'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{set "m:<NAME>" "particle_name"}}
 * @function set
 * @memberof ParticleHelpers
 * @param {string} [module] - module to load with either `module:<MODULE>` or `m:<M>`
 * @param {string} path - Path to the set (file extensions optional)
 * @param {Object} [options] - options for the set
 * @param {string} [options.logicalIdPrefix] - Add a prefix to the set's scope
 * @param {string} [options.logicalIdSuffix] - Add a suffix to the set's scope
 * @returns {string}
 *
 */

var File = require('vinyl');
var _ = require('lodash');
var fs = require('fs');
var matter = require('gray-matter');

// A set and a partial are nearly the same and should be looked at
// to shsre more code.  At this time the following is almost an exact copy of partial
var helper = function(cModule,pPath,hArgs,hOpts,cOpts) {

    var engine = cOpts.handlebars;
    var particle = cOpts.particleLoader.loadParticle('set',cModule,pPath,{parentFile: hOpts.data._file});
    var file = new File({path: particle.path});
    var m = matter(fs.readFileSync(particle.fsPath,{encoding:'utf8'}));

    var fn = engine.compile(m.content,{noEscape:true});
    var data = cOpts.handlebars.createFrame(hOpts.data || {});
    var extended = data._setExtended || false;
    data._file = file;
    data._setExtended = true;

    var templateContent = '';
    if (extended === true) {
      var self = cOpts.handlebars.createFrame(this);

      self.logicalIdPrefix = [self.logicalIdPrefix,(hOpts.hash.logicalIdPrefix || m.data.logicalIdPrefix)].join('');

      // If extending another set this has priority
      templateContent = new engine.SafeString(fn(_.merge(m.data,hOpts.hash,self),{data:data}));
    }
    else {
      templateContent = new engine.SafeString(fn(_.merge(m.data,this,hOpts.hash),{data:data}));
    }
    return templateContent;
};

module.exports.name = 'set';
module.exports.helper = helper;
