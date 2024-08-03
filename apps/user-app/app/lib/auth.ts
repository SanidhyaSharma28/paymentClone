import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { signinSchema } from "@repo/schemas";
 
 
export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Number/Email", type: "text", placeholder: "Enter registered number or email...", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
        try {
          const { error } = signinSchema.safeParse(credentials);
          if (error) {
            throw new Error("Validation failed");
          }

          const existingUser = await db.user.findFirst({
            where: {
              OR: [{ number: credentials.username }, { email: credentials.username }]
            }
          });

          if (!existingUser) {
            throw new Error("User not found");
          }

          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (!passwordValidation) {
            throw new Error("Invalid password");
          }

          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            number: existingUser.number,
            email: existingUser.email,
          };

        } catch (err) {
          console.error("Error in authorize:", err);
          return null;
        }
          },
        })
    ],
    secret: process.env.JWT_SECRET ,
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  