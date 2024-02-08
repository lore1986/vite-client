export const BaseConfig = {
    wsUrl: 'wss://localhost:5001/ws',//'wss://fasito.net/ws',
    webSocketState: {
        MESSAGING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3,
        NOTCONNECTED: 4
    }
}

export const CMD_RW  = {

    REQUEST_CMD1 : 0,
    RESPONSE_CMD1 : 1,
    DEBUGMES_CMD1 : 2,

    ID_MODULO_BASE : 0,
    ID_ALTO_LIVELLO : 1,
    ID_INTERFACCIA : 2,
    ID_WEBAPP : 3,

    ID_MUX_MPPT : 34,
    ID_RADIOCOMANDO : 35,

    ID_MPPT : 36,

    ID_IMU : 37,
    ID_ECHO : 38,
    ID_MOTORI : 39,
    ID_BMS : 40,
    ID_GPS : 41,
    ID_POWER : 42,
    ID_LED : 43,
    ID_MICRO_JETSON : 44,

    ID_MODULO_AMB : 50,
    ID_ROBOT_ARM_1 : 51,
    ID_ROBOT_ARM_2 : 52,
    ID_INCUBATORE : 53,
    ID_OPENER : 54,
    ID_QUANTITRAY : 55,

    ID_PRUA : 60,
    ID_POPPA : 70,

    ID_PORTA_0 : 0,
    ID_PORTA_1 : 1,
    ID_PORTA_5 : 5,
    ID_PORTA_6 : 6,
    ID_PORTA_7 : 7,
    ID_PORTA_8 : 8,

    ID_PORTA_SOCK : 9,

    /*        public const   byte  PORTA_0 Serial
            #if defined (ARDUINO_TEENSY41)
            public const   byte  PORTA_1 Serial1
            public const   byte  PORTA_5 Serial5
            public const   byte  PORTA_6 Serial6
            public const   byte  PORTA_7 Serial7
            public const   byte  PORTA_8 Serial8
            #endif
    */

    TEST_GENERIC_CMD2 : 254, //Comando per mandare un generico test dall'interfaccia
    TEST_GENERIC_CMD3 : 254, //Comando per mandare un generico test dall'interfaccia

    //*******************************MODULO BASE
    EN_SLEEP_CMD2 : 0,
    SET_DEBUG_PORT_CMD2 : 1,
    SET_SD_CMD2 : 2,
    SET_FLASH_CMD2 : 3,
    SAVE_MISSION_CMD2 : 4,
    GET_MISSION_CMD2 : 5,
    SEND_SCHEDULE_CMD2 : 6,
    READ_SCHEDULE_CMD2 : 7,
    SEND_DUMMY_CMD2 : 8,
    START_NEXT_SCHED_CMD2 : 9,
    UPDATE_MISS_LIST_CMD2 : 10,
    START_THIS_MISS_CMD2 : 11,
    SET_MP_RADIUS_CMD2 : 12,
    EN_DEB_PRINT_CMD2 : 13,
    LOCK_MUX_CH_CMD2 : 14,
    REMOTE_CONTROL_CMD2 : 15,
    SET_NAV_GPS_CMD2 : 16,
    SET_NAV_HEAD_CMD2 : 17,
    JS_DRIVING_SET_CMD2 : 18,
    JS_DRIVING_DATA_CMD2 : 19,
    RADIO_DRIVING_SET_CMD2 : 20,
    RADIO_DRIVING_DATA_CMD2 : 21,
    SET_TEL_NAV_CMD2 : 22,
    SET_AUT_NAV_CMD2 : 23,
    SET_MODE_TETAD_CMD2 : 24,
    SET_MODE_VELD_CMD2 : 25,
    SET_MISC_PARAM_CMD2 : 26,
    SET_JS_DEB_CMD2 : 27,
    GET_CONTROL_INFO_CMD2 : 28,
    GET_ANTICOLL_TETAD_CMD2 : 29,
    GET_JETSON_SIGNAL_CMD2 : 30,
    SEND_DATA_JETSON_CMD2 : 31,
    GET_JETSON_WP_CMD2 : 32,
    SET_DRONE_EQUIP_CMD2 : 33,
    GET_IP_PORT_CMD2 : 34,
    SET_IP_PORT_CMD2 : 35,
    COOLING_SET_CMD2 : 36,
    REBOOT_TEENSY_CMD2 : 37,
    MAIN_DATA_CMD2 : 38,

    SD_SET_DEB_TIME_CMD3 : 0,
    SD_READ_CMD3 : 1,
    SD_DELETE_CMD3 : 2,

    FLASH_READ_CMD3 : 0,
    FLASH_DELETE_CMD3 : 1,

    SAVE_MISSION_PARAM_CMD3 : 0,
    SAVE_MISSION_WP_CMD3 : 1,

    GET_MISSION_PARAM_CMD3 : 0,
    GET_MISSION_WP_CMD3 : 1,

    START_UPDATE_LIST_CMD3 : 0,
    UPDATE_DIR_LIST_CMD3 : 1,
    UPDATE_FILE_LIST_CMD3 : 2,
    END_FILE_LIST_CMD3 : 3,
    INPUT_JOYSTICK_CMD3 : 0,
    INPUT_RADIO_CMD3 : 1,

    JS_BOAT_CMD3 : 0,
    JS_AIR_DRONE_CMD3 : 1,
    JS_SUBM_CMD3 : 2,
    JS_ARM_CMD3 : 3,

    //*******************************POWER
    POWER_EN_CMD2 : 0,

    POWER_EN_GET_CMD3 : 0,
    POWER_EN_SET_CMD3 : 1,
    //*********************************IMU
    IMU_SET_CMD2 : 0,
    IMU_GET_CMD2 : 1,
    IMU_CFG_CMD2 : 2,
    IMU_DEB_CFG_CMD2 : 3,
    IMU_086_SRESET_CMD2 : 4,
    IMU_086_HRESET_CMD2 : 5,

    IMU_RPY_CMD3 : 0,
    IMU_RPY_ACC_CMD3 : 1,
    IMU_RPY_ACC_GYR_CMD3 : 2,
    IMU_RPY_ACC_GYR_MAG_CMD3 : 3,
    IMU_GET_086_CAL_CMD3 : 4,

    IMU_086_SET_REPORTS_CMD3 : 4,
    IMU_086_REQ_CAL_STA_CMD3 : 5,
    IMU_086_DEB_MES_EN_CMD3 : 6,

    IMU_UPDATE_CFG_GET_CMD3 : 0,
    IMU_UPDATE_CFG_SET_CMD3 : 1,
    IMU_UPDATE_CAL_GET_CMD3 : 2,
    IMU_UPDATE_CAL_SET_CMD3 : 3,

    IMU_DEB_CFG_GET_CMD3 : 0,
    IMU_DEB_CFG_SET_CMD3 : 1,

    //******************************MOTORI
    MOTOR_DRIVE_CMD2 : 0,
    MOTOR_TELEM_CMD2 : 1,

    MOTOR_OFF_CMD3 : 0,
    MOTOR_ERPM_CMD3 : 1,
    MOTOR_CURRENT_CMD3 : 2,
    MOTOR_ERPM_ALL_CMD3 : 3,

    MOTOR_TELEM_CDCS_CMD3 : 0,
    MOTOR_TELEM_DDSS_CMD3 : 1,

    MOTOR_CD : 1,
    MOTOR_CS : 2,
    MOTOR_DD : 3,
    MOTOR_SS : 4,

    INDEX_MOT_DD : 0,
    INDEX_MOT_SS : 1,
    INDEX_MOT_CD : 2,
    INDEX_MOT_CS : 3,

    AXIS_X : 0,
    AXIS_Y : 1,
    THROTTLE : 2,
    WHEEL : 3,

    //*********************************BMS

    BMS_PARAM_CMD2 : 0,
    BMS_GET_DATA_CMD2 : 1,
    BMS_DEB_CFG_CMD2 : 2,

    BMS_GET_VCELL_CMD3 : 0,
    BMS_GET_BASIC_CMD3 : 1,
    BMS_GET_EEPROM_CMD3 : 2,

    BMS_GET_PARAM_CMD3 : 0,
    BMS_SET_PARAM_CMD3 : 1,

    BMS_DEB_CFG_GET_CMD3 : 0,
    BMS_DEB_CFG_SET_CMD3 : 1,

    //*********************************GPS

    GPS_GET_CMD2 : 0,
    GPS_SET_CMD2 : 1,
    GPS_DEB_CFG_CMD2 : 2,

    GPS_NAV_PVT_CMD3 : 0,
    GPS_NAV_RELPOSNED_CMD3 : 1,

    GPS_DEB_CFG_GET_CMD3 : 0,
    GPS_DEB_CFG_SET_CMD3 : 1,

    //*********************************ECHO
    ECHO_NANO_GET_CMD2 : 0,

    ECHO_GET_CMD2 : 0,
    ECHO_CFG_CMD2 : 1,
    ECHO_DEB_CFG_CMD2 : 2,

    ECHO_CFG_GET_CMD3 : 0,
    ECHO_CFG_SET_CMD3 : 1,

    ECHO_DEB_CFG_GET_CMD3 : 0,
    ECHO_DEB_CFG_SET_CMD3 : 1,

    //*********************************LED
    LED_BULLET_CMD2 : 0,
    LED_MAIN_CMD2 : 1,
    LED_FRONT_CMD2 : 2,
    LED_IR_CMD2 : 3,
    LIGHT_SENS_CMD2 : 4,
    LED_FAIRING_CMD2 : 5,
    LED_FAIRING_DEB_CMD2 : 6,

    //*********************************MPPT
    SINC_CHAR_MPPT_0 : 36,
    SINC_CHAR_MPPT_1 : 36,
    SINC_CHAR_MPPT_2 : 69,

    id_mppt : 36,//SINC_CHAR_MPPT_0,
    MPPT_CMD1 : 0,

    MPPT_NANO_GET_CMD2 : 0,
    MPPT_GET_CMD2 : 1,
    MPPT_SET_CMD2 : 2,
    MPPT_DEB_CMD2 : 3,

    MPPT_DEB_GET_CMD3 : 0,
    MPPT_DEB_SET_CMD3 : 1,

    MPPT_0_GET_CMD3 : 0,
    MPPT_1_GET_CMD3 : 1,
    MPPT_2_GET_CMD3 : 2,
    MPPT_3_GET_CMD3 : 3,

    VI_CMD2 : 5,

    DIS_VI_NF_CMD3 : 0,
    EN_VI_NF_CMD3 : 1,


    REGI_VAL_CMD1 : 1,
    SET_BATT_CMD2 : 12,
    SET_BATT_NCELL_CMD3 : 4,

    //*********************************ricevente
    N_CH_READ : 6,

    CH_DX_X : 0,
    CH_DX_Y : 1,

    CH_SX_Y : 2,
    CH_SX_X : 3,

    CH_SX_ROT : 4,
    CH_DX_ROT : 5,
    //*********************************MODULO AMB
    REG_NEW_WP_SD_CMD2 : 0,
    READ_SD_WP_FILE_CMD2 : 1,
    //public const   byte  SET_SD_CMD2            2  // In comune con modulo base e interfaccia
    SET_AMB_POWER_CMD2 : 3,
    REG_ACTION_CMD2 : 4,
    REG_HEADER_CMD2 : 5,
    READ_SAMPLING_CMD2 : 6,
    MISSION_EXEC_CMD2 : 7,
    //public const   byte  UPDATE_MISS_LIST_CMD2     10 // In comune con modulo base e interfaccia
    //public const   byte  START_SERVO_MISSION_CMD2  12 // In comune fra modulo ambientale, interfaccia, bracci



    //public const   byte  SET_DRONE_EQUIP_CMD2      33 // In comune con modulo base e interfaccia
    //public const   byte  REBOOT_TEENSY_CMD2        37 // In comune con modulo base e interfaccia
    //public const   byte  MAIN_DATA_CMD2            38 // In comune con modulo base e interfaccia
    //*********************************ROBOT ARM
    GET_DATA_ARM_CMD2 : 0,
    SERVO_DRIVE_PER_CMD2 : 1,
    SERVO_DRIVE_ANG_CMD2 : 2,
    NEW_POINTS_CMD2 : 3,
    REG_STRUCT_MIN_CMD2 : 4,
    REG_STRUCT_MAX_CMD2 : 5,
    GO_TO_RIF_VITE_CMD2 : 6,
    GO_TO_ZERO_VITE_CMD2 : 7,
    SET_CURR_CLAW_CMD2 : 8,
    SERVO_GET_PER_CMD2 : 9,
    SERVO_GET_ANG_CMD2 : 10,
    SET_PID_PARAM_VITE_CMD2 : 11,
    //********************************* INCUBATORE
    GET_DATA_INC_CMD2 : 0,
    SET_TEMP_RIF_CMD2 : 1,
    DOOR_APRI_CHIUDI_CMD2 : 2,
    TOGGLE_BACKLIGHT_CMD2 : 3,
    SLEEP_INCUBATOR_CMD2 : 4,

    START_INCUB_MISSION_CMD2 : 15,

    SET_TEMP_RIF_UP_CMD3 : 0,
    SET_TEMP_RIF_DW_CMD3 : 1,

    DOOR_APRI_UP_CMD3 : 0,
    DOOR_APRI_DW_CMD3 : 1,
    DOOR_CHIUDI_UP_CMD3 : 2,
    DOOR_CHIUDI_DW_CMD3 : 3,
    DOOR_STOP_CMD3 : 4,
    //********************************* APRIBARATTOLO
    OPEN_JAR_CMD2 : 0,
    CLOSE_JAR_CMD2 : 1,
    //********************************* QUANTITRAY
    MOVE_JARS_CMD2 : 0,
    MOVE_PISTON_CMD2 : 1,
    MOVE_MOTOR_CMD2 : 2,

    RETRACT_PISTON_CMD3 : 0,
    PUSH_PISTON_CMD3 : 1,
    STOP_PISTON_CMD3 : 2,

    MOVE_MOTOR_CW_CMD3 : 0,
    MOVE_MOTOR_CCW_CMD3 : 1,
    STOP_MOTOR_CMD3 : 2,
    //********************************* PRUA
    GET_PRESSURE_CMD2 : 0,
    SET_PUMP_PARAM_CMD2 : 1,
    SET_COMPRESSOR_CMD2 : 2,
    SET_VALVES_CMD2 : 3,
    OPEN_MOD_DOOR_CMD2 : 4,
    CLOSE_MOD_DOOR_CMD2 : 5,
    SET_DEB_PRESS_CMD2 : 6,
    SET_GAV_PARAMS_CMD2 : 7,
    BOAT_OVERTURN_CMD2 : 8,
    EN_MODULE_BMS_CMD2 : 9,
    //****************************Indici per salvare lo stato di comunicazione
    INDEX_PINGPONG_MISSION : 0,
    //****************************Per l'albero dei file della flash
    END_OF_STRING : 0,
    DIRECTORY_CMD : 1,
    FILE_CMD : 2,
    PARENT_CMD : 3,
    //****************************struttura messaggio Inviato
    INDEX_SINCHAR_0 : 0,
    INDEX_SINCHAR_1 : 1,
    INDEX_SINCHAR_2 : 2,

    INDEX_BUF_LENG : 3,
    INDEX_BUF_SORG : 4,
    INDEX_BUF_DEST : 5,
    INDEX_BUF_ID_D : 6,

    INDEX_BUF_CMD_1 : 7,
    INDEX_BUF_CMD_2 : 8,
    INDEX_BUF_CMD_3 : 9,
    INDEX_BUF_CONTB : 10,

    MYID : 3, //ID_WEBAPP,


}