#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 1

int main() {
   //int moons[12] = {3, 15, 8, 5, -1, -2, -10, 8, 2, 8, 4, -5};
   //int vels[12] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

   int moons[12] = {-8, -10, 0, 5, 5, 10, 2, -7, 3, 9, -8, -3};
   int vels[12] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

   int fmoons[12] = {-8, -10, 0, 5, 5, 10, 2, -7, 3, 9, -8, -3};
   int fvels[12] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

   for (uint64_t step = 0; TRUE; step++) {
      if (step % 10000000 == 0)
         printf("step %ld \n", step);
      if (step && !memcmp(moons, fmoons, 12 * sizeof(int)) && !memcmp(vels, fvels, 12 * sizeof(int))) {
         printf("done -_- %ld\n", step);
         break;
      }

      for (int i = 0; i < 4; i++) {
         for (int j = 0; j < i; j++) {
            for (int k = 0; k < 3; k++) {
               if (moons[3 * i + k] > moons[3 * j + k]) {
                  vels[i * 3 + k]--;
                  vels[j * 3 + k]++;
               } else if (moons[i * 3 + k] < moons[j * 3 + k]) {
                  vels[i * 3 + k]++;
                  vels[j * 3 + k]--;
               }
            }
         }
      }

      for (int i = 0; i < 4; i++) {
         for (int k = 0; k < 3; k++) {
            moons[i * 3 + k] += vels[i * 3 + k];
         }
      }
   }
}
