<?php
ini_set("memory_limit", "128M");
/**
 * This file acts as the "front controller" to your application. You can
 * configure your application, modules, and system directories here.
 * PHP error_reporting level may also be changed.
 *
 * @see http://kohanaphp.com
 */

if( count($argv) > 1 ) {
    for( $x = 1; $x < count($argv); $x++ ) {
        switch($argv[$x]) {
        //            case '--verbose': { // Print results to std out
        //                    $Verbose = true;
        //                }; break;
            case '--host': { // Print results to std out
                    $_SERVER['HTTP_HOST'] = trim($argv[$x+1]);
                }; break;
        }
    }

    define('BR', "\n");
    define('IS_CLI', true);

    set_time_limit(0);
    ini_set('memory_limit','1024M');
}
else {
    if (isset($_GET['cli']) AND ($_GET['cli']==true)) {
        define('IS_CLI', true);
    }
    else {
        define('IS_CLI', false);
    }
    define('BR', '<br />'."\n");
}
/**
 * Define the website environment status. When this flag is set to TRUE, some
 * module demonstration controllers will result in 404 errors. For more information
 * about this option, read the documentation about deploying Kohana.
 *
 * @see http://docs.kohanaphp.com/installation/deployment
 */
switch ($_SERVER['HTTP_HOST']) {
    case 'localhost':
    case 'kcomm.localhost':
    case '10.23.59.51':
        define('IN_PRODUCTION', FALSE);
        break;
    default:
        define('IN_PRODUCTION', TRUE);
}


/**
 * Website application directory. This directory should contain your application
 * configuration, controllers, models, views, and other resources.
 *
 * This path can be absolute or relative to this file.
 */
$kohana_application = 'application';

/**
 * Kohana modules directory. This directory should contain all the modules used
 * by your application. Modules are enabled and disabled by the application
 * configuration file.
 *
 * This path can be absolute or relative to this file.
 */
$kohana_modules = 'modules';

/**
 * Kohana system directory. This directory should contain the core/ directory,
 * and the resources you included in your download of Kohana.
 *
 * This path can be absolute or relative to this file.
 */
$kohana_system = 'system';

/**
 * Test to make sure that Kohana is running on PHP 5.2 or newer. Once you are
 * sure that your environment is compatible with Kohana, you can comment this
 * line out. When running an application on a new server, uncomment this line
 * to check the PHP version quickly.
 */
version_compare(PHP_VERSION, '5.2', '<') and exit('Kohana requires PHP 5.2 or newer.');

/**
 * Set the error reporting level. Unless you have a special need, E_ALL is a
 * good level for error reporting.
 */
error_reporting(E_ALL & ~E_STRICT);

/**
 * Turning off display_errors will effectively disable Kohana error display
 * and logging. You can turn off Kohana errors in application/config/config.php
 */
ini_set('display_errors', TRUE);

/**
 * If you rename all of your .php files to a different extension, set the new
 * extension here. This option can left to .php, even if this file has a
 * different extension.
 */
define('EXT', '.php');

//
// DO NOT EDIT BELOW THIS LINE, UNLESS YOU FULLY UNDERSTAND THE IMPLICATIONS.
// ----------------------------------------------------------------------------
// $Id: index.php 3915 2009-01-20 20:52:20Z zombor $
//

$kohana_pathinfo = pathinfo(__FILE__);
// Define the front controller name and docroot
define('DOCROOT', $kohana_pathinfo['dirname'].DIRECTORY_SEPARATOR);
define('KOHANA',  $kohana_pathinfo['basename']);

// If the front controller is a symlink, change to the real docroot
is_link(KOHANA) and chdir(dirname(realpath(__FILE__)));

// If kohana folders are relative paths, make them absolute.
$kohana_application = file_exists($kohana_application) ? $kohana_application : DOCROOT.$kohana_application;
$kohana_modules = file_exists($kohana_modules) ? $kohana_modules : DOCROOT.$kohana_modules;
$kohana_system = file_exists($kohana_system) ? $kohana_system : DOCROOT.$kohana_system;

// Define application and system paths
define('APPPATH', str_replace('\\', '/', realpath($kohana_application)).'/');
define('MODPATH', str_replace('\\', '/', realpath($kohana_modules)).'/');
define('SYSPATH', str_replace('\\', '/', realpath($kohana_system)).'/');

// Clean up
unset($kohana_application, $kohana_modules, $kohana_system);

if (file_exists(DOCROOT.'install'.EXT)) {
// Load the installation tests
    include DOCROOT.'install'.EXT;
}
else {
// Initialize Kohana
    require SYSPATH.'core/Bootstrap'.EXT;
}

//** SVN TEST mask edited ***/