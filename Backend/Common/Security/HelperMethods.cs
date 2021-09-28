using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Helper
{
  public class HelperMethods
    {
        //Generate RandomNo
        public static int GenerateRandomNo()
        {
            int _min = 100000;
            int _max = 999990;
            Random rdm = new Random();
            return rdm.Next(_min, _max);
        }

    }
}
