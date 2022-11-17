
/**
*  Predictor for Weight from model/63735bdaaba2df3fc9001a67
*  Predictive model by BigML - Machine Learning Made Easy
*/
function predictWeight(branchid, flavorid, dateDayOfMonth) {
    if (dateDayOfMonth == null) {
        return 1.27034;
    }
    else if (dateDayOfMonth > 5) {
        if (branchid == null) {
            return 1.3154;
        }
        else if (branchid > 94) {
            if (branchid > 99) {
                return 1.06078;
            }
            else if (branchid <= 99) {
                if (branchid > 95) {
                    if (flavorid == null) {
                        return 1.33125;
                    }
                    else if (flavorid > 1) {
                        return 1.31392;
                    }
                    else if (flavorid <= 1) {
                        return 1.41574;
                    }
                }
                else if (branchid <= 95) {
                    return 1.08152;
                }
            }
        }
        else if (branchid <= 94) {
            if (branchid > 45) {
                if (branchid > 75) {
                    if (branchid > 76) {
                        if (branchid > 89) {
                            if (dateDayOfMonth > 7) {
                                if (branchid > 91) {
                                    return 1.31357;
                                }
                                else if (branchid <= 91) {
                                    return 1.41318;
                                }
                            }
                            else if (dateDayOfMonth <= 7) {
                                return 1.43166;
                            }
                        }
                        else if (branchid <= 89) {
                            if (branchid > 86) {
                                if (branchid > 87) {
                                    if (branchid > 88) {
                                        return 1.08555;
                                    }
                                    else if (branchid <= 88) {
                                        return 1.30306;
                                    }
                                }
                                else if (branchid <= 87) {
                                    return 1.06598;
                                }
                            }
                            else if (branchid <= 86) {
                                if (flavorid == null) {
                                    return 1.35243;
                                }
                                else if (flavorid > 2) {
                                    if (dateDayOfMonth > 7) {
                                        if (branchid > 80) {
                                            return 1.37577;
                                        }
                                        else if (branchid <= 80) {
                                            return 1.30127;
                                        }
                                    }
                                    else if (dateDayOfMonth <= 7) {
                                        return 1.26504;
                                    }
                                }
                                else if (flavorid <= 2) {
                                    if (branchid > 84) {
                                        return 1.31675;
                                    }
                                    else if (branchid <= 84) {
                                        if (dateDayOfMonth > 11) {
                                            return 1.51627;
                                        }
                                        else if (dateDayOfMonth <= 11) {
                                            return 1.39104;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (branchid <= 76) {
                        return 1.10408;
                    }
                }
                else if (branchid <= 75) {
                    if (flavorid == null) {
                        return 1.35738;
                    }
                    else if (flavorid > 2) {
                        if (branchid > 51) {
                            if (flavorid > 3) {
                                if (dateDayOfMonth > 11) {
                                    return 1.27645;
                                }
                                else if (dateDayOfMonth <= 11) {
                                    return 1.36606;
                                }
                            }
                            else if (flavorid <= 3) {
                                if (branchid > 53) {
                                    if (branchid > 72) {
                                        return 1.48537;
                                    }
                                    else if (branchid <= 72) {
                                        return 1.38657;
                                    }
                                }
                                else if (branchid <= 53) {
                                    return 1.62527;
                                }
                            }
                        }
                        else if (branchid <= 51) {
                            return 1.33054;
                        }
                    }
                    else if (flavorid <= 2) {
                        if (branchid > 63) {
                            if (branchid > 67) {
                                if (flavorid > 1) {
                                    return 1.37434;
                                }
                                else if (flavorid <= 1) {
                                    return 1.28007;
                                }
                            }
                            else if (branchid <= 67) {
                                return 1.24444;
                            }
                        }
                        else if (branchid <= 63) {
                            if (dateDayOfMonth > 10) {
                                if (branchid > 60) {
                                    return 1.51053;
                                }
                                else if (branchid <= 60) {
                                    return 1.38896;
                                }
                            }
                            else if (dateDayOfMonth <= 10) {
                                return 1.34225;
                            }
                        }
                    }
                }
            }
            else if (branchid <= 45) {
                if (branchid > 13) {
                    if (branchid > 15) {
                        if (branchid > 30) {
                            if (branchid > 37) {
                                if (branchid > 40) {
                                    if (branchid > 41) {
                                        return 1.32185;
                                    }
                                    else if (branchid <= 41) {
                                        return 1.07743;
                                    }
                                }
                                else if (branchid <= 40) {
                                    if (flavorid == null) {
                                        return 1.35216;
                                    }
                                    else if (flavorid > 4) {
                                        return 1.22273;
                                    }
                                    else if (flavorid <= 4) {
                                        return 1.3765;
                                    }
                                }
                            }
                            else if (branchid <= 37) {
                                if (branchid > 35) {
                                    return 1.10345;
                                }
                                else if (branchid <= 35) {
                                    if (branchid > 33) {
                                        if (dateDayOfMonth > 6) {
                                            return 1.33236;
                                        }
                                        else if (dateDayOfMonth <= 6) {
                                            return 1.44368;
                                        }
                                    }
                                    else if (branchid <= 33) {
                                        if (branchid > 32) {
                                            return 1.11726;
                                        }
                                        else if (branchid <= 32) {
                                            if (branchid > 31) {
                                                return 1.38226;
                                            }
                                            else if (branchid <= 31) {
                                                return 1.14534;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else if (branchid <= 30) {
                            if (branchid > 18) {
                                if (flavorid == null) {
                                    return 1.35579;
                                }
                                else if (flavorid > 4) {
                                    if (branchid > 28) {
                                        return 1.51154;
                                    }
                                    else if (branchid <= 28) {
                                        return 1.39026;
                                    }
                                }
                                else if (flavorid <= 4) {
                                    return 1.34486;
                                }
                            }
                            else if (branchid <= 18) {
                                if (branchid > 17) {
                                    return 1.07872;
                                }
                                else if (branchid <= 17) {
                                    if (flavorid == null) {
                                        return 1.29041;
                                    }
                                    else if (flavorid > 3) {
                                        return 1.20483;
                                    }
                                    else if (flavorid <= 3) {
                                        return 1.34181;
                                    }
                                }
                            }
                        }
                    }
                    else if (branchid <= 15) {
                        if (branchid > 14) {
                            return 1.00971;
                        }
                        else if (branchid <= 14) {
                            return 1.12278;
                        }
                    }
                }
                else if (branchid <= 13) {
                    if (branchid > 2) {
                        if (branchid > 9) {
                            if (dateDayOfMonth > 6) {
                                return 1.35888;
                            }
                            else if (dateDayOfMonth <= 6) {
                                return 1.4606;
                            }
                        }
                        else if (branchid <= 9) {
                            if (dateDayOfMonth > 11) {
                                return 1.2548;
                            }
                            else if (dateDayOfMonth <= 11) {
                                return 1.33755;
                            }
                        }
                    }
                    else if (branchid <= 2) {
                        if (branchid > 1) {
                            return 1.15222;
                        }
                        else if (branchid <= 1) {
                            return 1.34545;
                        }
                    }
                }
            }
        }
    }
    else if (dateDayOfMonth <= 5) {
        if (branchid == null) {
            return 1.20641;
        }
        else if (branchid > 10) {
            if (branchid > 51) {
                if (branchid > 98) {
                    return 1.00405;
                }
                else if (branchid <= 98) {
                    if (branchid > 97) {
                        return 1.4185;
                    }
                    else if (branchid <= 97) {
                        if (branchid > 86) {
                            if (branchid > 89) {
                                if (branchid > 96) {
                                    return 1.04042;
                                }
                                else if (branchid <= 96) {
                                    if (branchid > 95) {
                                        return 1.4439;
                                    }
                                    else if (branchid <= 95) {
                                        if (branchid > 91) {
                                            if (branchid > 93) {
                                                return 1.23229;
                                            }
                                            else if (branchid <= 93) {
                                                return 1.06193;
                                            }
                                        }
                                        else if (branchid <= 91) {
                                            return 1.33066;
                                        }
                                    }
                                }
                            }
                            else if (branchid <= 89) {
                                if (dateDayOfMonth > 2) {
                                    return 1.00444;
                                }
                                else if (dateDayOfMonth <= 2) {
                                    return 1.10917;
                                }
                            }
                        }
                        else if (branchid <= 86) {
                            if (branchid > 82) {
                                if (dateDayOfMonth > 2) {
                                    return 1.29676;
                                }
                                else if (dateDayOfMonth <= 2) {
                                    return 1.40687;
                                }
                            }
                            else if (branchid <= 82) {
                                if (branchid > 71) {
                                    if (branchid > 73) {
                                        if (branchid > 74) {
                                            if (branchid > 79) {
                                                if (branchid > 81) {
                                                    return 1.12952;
                                                }
                                                else if (branchid <= 81) {
                                                    return 1.34141;
                                                }
                                            }
                                            else if (branchid <= 79) {
                                                if (branchid > 77) {
                                                    return 1.03638;
                                                }
                                                else if (branchid <= 77) {
                                                    if (branchid > 76) {
                                                        return 1.42825;
                                                    }
                                                    else if (branchid <= 76) {
                                                        return 1.13055;
                                                    }
                                                }
                                            }
                                        }
                                        else if (branchid <= 74) {
                                            return 1.35032;
                                        }
                                    }
                                    else if (branchid <= 73) {
                                        return 1.05341;
                                    }
                                }
                                else if (branchid <= 71) {
                                    if (branchid > 52) {
                                        if (branchid > 65) {
                                            if (branchid > 69) {
                                                return 1.23754;
                                            }
                                            else if (branchid <= 69) {
                                                if (dateDayOfMonth > 3) {
                                                    return 1.41545;
                                                }
                                                else if (dateDayOfMonth <= 3) {
                                                    return 1.32956;
                                                }
                                            }
                                        }
                                        else if (branchid <= 65) {
                                            if (branchid > 62) {
                                                if (flavorid == null) {
                                                    return 1.12324;
                                                }
                                                else if (flavorid > 3) {
                                                    return 1.2325;
                                                }
                                                else if (flavorid <= 3) {
                                                    return 1.08962;
                                                }
                                            }
                                            else if (branchid <= 62) {
                                                if (flavorid == null) {
                                                    return 1.27656;
                                                }
                                                else if (flavorid > 3) {
                                                    return 1.19741;
                                                }
                                                else if (flavorid <= 3) {
                                                    if (branchid > 54) {
                                                        if (branchid > 55) {
                                                            if (branchid > 59) {
                                                                return 1.26679;
                                                            }
                                                            else if (branchid <= 59) {
                                                                return 1.3535;
                                                            }
                                                        }
                                                        else if (branchid <= 55) {
                                                            return 1.0122;
                                                        }
                                                    }
                                                    else if (branchid <= 54) {
                                                        return 1.38929;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else if (branchid <= 52) {
                                        return 1.0371;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (branchid <= 51) {
                if (branchid > 44) {
                    return 1.02243;
                }
                else if (branchid <= 44) {
                    if (branchid > 12) {
                        if (branchid > 26) {
                            if (branchid > 34) {
                                if (branchid > 37) {
                                    if (branchid > 38) {
                                        if (branchid > 43) {
                                            return 1.32097;
                                        }
                                        else if (branchid <= 43) {
                                            if (branchid > 42) {
                                                return 1.09259;
                                            }
                                            else if (branchid <= 42) {
                                                if (branchid > 41) {
                                                    return 1.34624;
                                                }
                                                else if (branchid <= 41) {
                                                    if (branchid > 40) {
                                                        return 1.05478;
                                                    }
                                                    else if (branchid <= 40) {
                                                        return 1.26117;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else if (branchid <= 38) {
                                        return 1.34679;
                                    }
                                }
                                else if (branchid <= 37) {
                                    if (flavorid == null) {
                                        return 1.12277;
                                    }
                                    else if (flavorid > 1) {
                                        return 1.17219;
                                    }
                                    else if (flavorid <= 1) {
                                        return 1.04356;
                                    }
                                }
                            }
                            else if (branchid <= 34) {
                                if (branchid > 28) {
                                    if (flavorid == null) {
                                        return 1.26174;
                                    }
                                    else if (flavorid > 3) {
                                        return 1.33797;
                                    }
                                    else if (flavorid <= 3) {
                                        if (dateDayOfMonth > 2) {
                                            if (flavorid > 2) {
                                                return 1.11306;
                                            }
                                            else if (flavorid <= 2) {
                                                return 1.23645;
                                            }
                                        }
                                        else if (dateDayOfMonth <= 2) {
                                            return 1.28516;
                                        }
                                    }
                                }
                                else if (branchid <= 28) {
                                    return 1.32978;
                                }
                            }
                        }
                        else if (branchid <= 26) {
                            if (branchid > 21) {
                                if (branchid > 23) {
                                    if (branchid > 24) {
                                        return 1.06071;
                                    }
                                    else if (branchid <= 24) {
                                        return 1.2702;
                                    }
                                }
                                else if (branchid <= 23) {
                                    return 1.00394;
                                }
                            }
                            else if (branchid <= 21) {
                                if (branchid > 19) {
                                    return 1.34635;
                                }
                                else if (branchid <= 19) {
                                    if (branchid > 17) {
                                        return 1.06258;
                                    }
                                    else if (branchid <= 17) {
                                        if (branchid > 15) {
                                            return 1.36988;
                                        }
                                        else if (branchid <= 15) {
                                            if (branchid > 13) {
                                                return 1.0678;
                                            }
                                            else if (branchid <= 13) {
                                                return 1.38283;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (branchid <= 12) {
                        return 1.02077;
                    }
                }
            }
        }
        else if (branchid <= 10) {
            if (branchid > 4) {
                if (dateDayOfMonth > 4) {
                    return 1.45838;
                }
                else if (dateDayOfMonth <= 4) {
                    if (dateDayOfMonth > 1) {
                        return 1.32796;
                    }
                    else if (dateDayOfMonth <= 1) {
                        return 1.44744;
                    }
                }
            }
            else if (branchid <= 4) {
                if (branchid > 3) {
                    return 1.01677;
                }
                else if (branchid <= 3) {
                    if (branchid > 2) {
                        return 1.40197;
                    }
                    else if (branchid <= 2) {
                        return 1.08343;
                    }
                }
            }
        }
    }
    return null;
}

module.exports = { predictWeight };