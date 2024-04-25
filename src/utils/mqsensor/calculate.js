

const curve = {
    //from mq2 datasheet
    "LPG":      [2.3,0.21,-0.47],
    "Smoke":    [2.3,0.53,-0.44],
    "Propane":  [2.3,0.24,-0.47],
    "H2":       [2.3,0.33,-0.47],
    //from mq4 datasheet
    "CH4":      [2.3,0.24,-0.35],
    "Alcohol":  [2.3,0.60,-0.07],
    "CO":       [2.3,0.63,-0.05],
    //from mq135 datasheet
    "ACETON":   [1.0,0.18,-0.32],
    "TOLUENO":  [1.0,0.2,-0.30],
    "CO2":      [1.0,0.38,-0.37],
    "NH4":      [1.0,0.42,-0.42]
}

const gas_id = {
    //from mq2 datasheet
    "LPG":      0,
    "Smoke":    1,
    "Propane":  2,
    "H2":       3,
    //from mq4 datasheet
    "CH4":      4,
    "Alcohol":  5,
    "CO":       6,
    //from mq135 datasheet
    "ACETON":   7,
    "TOLUENO":  8,
    "CO2":      9,
    "NH4":      10
}

const calculatePPM = (mq) => {
    var ro = mq.ro;
    var rs = mq.rs;

    function MQPercentage(ro, rs){
        val = {}
        //mq2
        val["LPG"]      = MQGetGasPercentage(rs['mq2']/ro['mq2'], gas_id['LPG'])
        val["Smoke"]    = MQGetGasPercentage(rs['mq2']/ro['mq2'], gas_id['Smoke'])
        val["Propane"]  = MQGetGasPercentage(rs['mq2']/ro['mq2'], gas_id['Propane'])
        val["H2"]       = MQGetGasPercentage(rs['mq2']/ro['mq2'], gas_id['H2'])
        //mq4
        val["CH4"]      = MQGetGasPercentage(rs['mq4']/ro['mq4'], gas_id['CH4'])
        val["Alcohol"]  = MQGetGasPercentage(rs['mq4']/ro['mq4'], gas_id['Alcohol'])
        val["CO"]       = MQGetGasPercentage(rs['mq4']/ro['mq4'], gas_id['CO'])
        //mq135
        val["ACETON"]   = MQGetGasPercentage(rs['mq135']/ro['mq135'], gas_id['ACETON'])
        val["TOLUENO"]  = MQGetGasPercentage(rs['mq135']/ro['mq135'], gas_id['TOLUENO'])
        val["CO2"]      = MQGetGasPercentage(rs['mq135']/ro['mq135'], gas_id['CO2'])
        val["NH4"]      = MQGetGasPercentage(rs['mq135']/ro['mq135'], gas_id['NH4'])
        //val["RAW_VALUE"]= rs
        return val
    }

    function MQGetGasPercentage(rs_ro_ratio, id){
        if ( id == gas_id['LPG'] ){
            return MQGetPercentage(rs_ro_ratio, curve['LPG'])
        }else if(id == gas_id['Smoke']){
            return MQGetPercentage(rs_ro_ratio, curve['Smoke'])
        }else if(id == gas_id['Propane']){
            return MQGetPercentage(rs_ro_ratio, curve['Propane'])
        }else if(id == gas_id['H2']){
            return MQGetPercentage(rs_ro_ratio, curve['H2'])
        }else if(id == gas_id['CH4']){
            return MQGetPercentage(rs_ro_ratio, curve['CH4'])
        }else if(id == gas_id['Alcohol']){
            return MQGetPercentage(rs_ro_ratio, curve['Alcohol'])
        }else if(id == gas_id['CO']){
            return MQGetPercentage(rs_ro_ratio, curve['CO'])
        }else if(id == gas_id['ACETON']){
            return MQGetPercentage(rs_ro_ratio, curve['ACETON'])
        }else if(id == gas_id['TOLUENO']){
            return MQGetPercentage(rs_ro_ratio, curve['TOLUENO'])
        }else if(id == gas_id['CO2']){
            return MQGetPercentage(rs_ro_ratio, curve['CO2'])
        }else if(id == gas_id['NH4']){
            return MQGetPercentage(rs_ro_ratio, curve['NH4'])
        }
        return 0
    }

    function MQGetPercentage(rs_ro_ratio, pcurve){
        // print(rs_ro_ratio)
        // print((math.log(rs_ro_ratio)-pcurve[1]))
        // print(((math.log(rs_ro_ratio)-pcurve[1])/ pcurve[2]) + pcurve[0]))
        
        // This is the natural natural logarithm -> log(rs_ro_ratio)
        return (Math.pow(10,(((Math.log(rs_ro_ratio)-pcurve[1])/ pcurve[2]) + pcurve[0])))
    }

    var val = MQPercentage(ro, rs);
    //reduce the value to 4 decimal places
    for (var key in val){
        val[key] = val[key].toFixed(4);
    }
    return val;
}

export default calculatePPM;