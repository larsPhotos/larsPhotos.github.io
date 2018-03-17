<?php
global $photo_magic_panels;
global $photo_magic_sections;
global $photo_magic_settings_controls;
global $photo_magic_repeated_settings_controls;
global $photo_magic_customizer_defaults;

/*defaults values*/
$photo_magic_customizer_defaults['photo-magic-home-portfolio-enable'] = 0;
$photo_magic_customizer_defaults['photo-magic-home-portfolio-title'] = __('My Portfolio','photo-magic');
$photo_magic_customizer_defaults['photo-magic-home-portfolio-number'] = 9;
$photo_magic_customizer_defaults['photo-magic-home-portfolio-column'] = 3;

/*aboutoptions*/
$photo_magic_sections['photo-magic-home-portfolio-options'] =
    array(
        'priority'       => 180,
        'title'          => __( 'Section settings', 'photo-magic' ),
        'panel'          => 'photo-magic-home-portfolio-panel',
    );


$photo_magic_settings_controls['photo-magic-home-portfolio-enable'] =
    array(
        'setting' =>     array(
            'default'              => $photo_magic_customizer_defaults['photo-magic-home-portfolio-enable']
        ),
        'control' => array(
            'label'                 =>  __( 'Enable Portfolio', 'photo-magic' ),
            'description'           => __( 'Enable Portfolio Section" on checked' , 'photo-magic' ),
            'section'               => 'photo-magic-home-portfolio-options',
            'type'                  => 'checkbox',
            'priority'              => 10,
            'active_callback'       => ''
        )
    );
$photo_magic_settings_controls['photo-magic-home-portfolio-title'] =
    array(
        'setting' =>     array(
            'default'              => $photo_magic_customizer_defaults['photo-magic-home-portfolio-title']
        ),
        'control' => array(
            'label'                 =>  __( 'Main Title', 'photo-magic' ),
            'description'           =>  __( 'Enable "portfolio Section" on checked', 'photo-magic' ),
            'section'               => 'photo-magic-home-portfolio-options',
            'type'                  => 'text',
            'priority'              => 20,
            'active_callback'       => ''
        )
    );

$photo_magic_settings_controls['photo-magic-home-portfolio-number'] =
    array(
        'setting' =>     array(
            'default'              => $photo_magic_customizer_defaults['photo-magic-home-portfolio-number']
        ),
        'control' => array(
            'label'                 =>  __( 'Number Of portfolio/s', 'photo-magic' ),
            'section'               => 'photo-magic-home-portfolio-options',
            'type'                  => 'select',
            'choices'               => array(
                1 => __( '1', 'photo-magic' ),
                2 => __( '2', 'photo-magic' ),
                3 => __( '3', 'photo-magic' ),
                4 => __( '4', 'photo-magic' ),
                5 => __( '5', 'photo-magic' ),
                6 => __( '6', 'photo-magic' ),
                7 => __( '7', 'photo-magic' ),
                8 => __( '8', 'photo-magic' ),
                9 => __( '9', 'photo-magic' )
            ),
            'priority'              => 40,
            'active_callback'       => ''
        )
    );
